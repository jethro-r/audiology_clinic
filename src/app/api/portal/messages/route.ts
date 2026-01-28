import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";

// GET /api/portal/messages - Get user's messages/conversations
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId");

    // If conversationId provided, get that specific conversation with messages
    if (conversationId) {
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [
            { participantOneId: session.user.id },
            { participantTwoId: session.user.id },
          ],
        },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
          participantOne: {
            select: { id: true, firstName: true, lastName: true, role: true },
          },
          participantTwo: {
            select: { id: true, firstName: true, lastName: true, role: true },
          },
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }

      // Mark messages as read
      await prisma.message.updateMany({
        where: {
          conversationId,
          senderId: { not: session.user.id },
          read: false,
        },
        data: { read: true },
      });

      return NextResponse.json(conversation);
    }

    // Get all conversations for user
    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { participantOneId: session.user.id },
          { participantTwoId: session.user.id },
        ],
      },
      include: {
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        participantOne: {
          select: { id: true, firstName: true, lastName: true, role: true },
        },
        participantTwo: {
          select: { id: true, firstName: true, lastName: true, role: true },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    // Transform data to include unread count
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv: any) => {
        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conv.id,
            senderId: { not: session.user.id },
            read: false,
          },
        });

        const otherParticipant =
          conv.participantOneId === session.user.id
            ? conv.participantTwo
            : conv.participantOne;

        return {
          id: conv.id,
          subject: conv.subject,
          lastMessage: conv.messages[0]?.content || "",
          lastMessageTime: conv.messages[0]?.createdAt || conv.createdAt,
          unreadCount,
          participant: {
            id: otherParticipant.id,
            name: `${otherParticipant.firstName} ${otherParticipant.lastName}`,
            role: otherParticipant.role,
          },
        };
      })
    );

    return NextResponse.json(conversationsWithUnread);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST /api/portal/messages - Send a new message
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { conversationId, recipientId, subject, content } = body;

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    let conversation;

    if (conversationId) {
      // Add message to existing conversation
      conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [
            { participantOneId: session.user.id },
            { participantTwoId: session.user.id },
          ],
        },
      });

      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
    } else {
      // Create new conversation
      if (!recipientId) {
        return NextResponse.json(
          { error: "Recipient is required for new conversation" },
          { status: 400 }
        );
      }

      // Verify recipient exists
      const recipient = await prisma.user.findUnique({
        where: { id: recipientId },
      });

      if (!recipient) {
        return NextResponse.json(
          { error: "Recipient not found" },
          { status: 404 }
        );
      }

      // Check if conversation already exists between these two users
      conversation = await prisma.conversation.findFirst({
        where: {
          OR: [
            { participantOneId: session.user.id, participantTwoId: recipientId },
            { participantOneId: recipientId, participantTwoId: session.user.id },
          ],
        },
      });

      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participantOneId: session.user.id,
            participantTwoId: recipientId,
            subject: subject || "New Conversation",
          },
        });
      }
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: session.user.id,
        content: content.trim(),
        read: false,
      },
    });

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
