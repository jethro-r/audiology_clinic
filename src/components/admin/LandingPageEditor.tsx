"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import IconPicker from "@/components/admin/IconPicker";
import type {
  ServiceLanding,
  LandingHero,
  LandingFeatureCards,
  LandingSteps,
  LandingAudience,
  LandingFaq,
} from "@/lib/serviceLanding";

const inputCls =
  "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground text-sm";
const labelCls = "block text-xs font-medium text-muted uppercase tracking-wide mb-1";
const cardCls = "bg-card rounded-xl border border-border p-4 shadow-sm space-y-3";
const sectionTitleCls = "text-xs font-semibold text-muted uppercase tracking-widest";
const iconBtnCls =
  "p-1 rounded-md text-muted hover:text-foreground hover:bg-background transition-colors disabled:opacity-30 disabled:cursor-not-allowed";

interface LandingPageEditorProps {
  value: ServiceLanding;
  onChange: (landing: ServiceLanding) => void;
}

/** Blank landing skeleton used when a service has no landing content yet. */
export function defaultLanding(): ServiceLanding {
  return {
    hero: {
      headline: "",
      headlineAccent: "",
      intro: "",
      trustLine: "",
      primaryCtaText: "",
      secondaryCta: "call",
    },
    cta: {},
    seo: {},
  };
}

/**
 * Fixed-skeleton editor for the /services/[slug] landing page.
 * Controlled by the service edit form; the whole landing object is saved
 * with the service. Optional sections are present in the object only when
 * enabled (the page template omits whatever is missing).
 */
export default function LandingPageEditor({ value, onChange }: LandingPageEditorProps) {
  // --- hero (always part of the skeleton) ---
  const setHero = (patch: Partial<LandingHero>) =>
    onChange({ ...value, hero: { ...value.hero, ...patch } });

  // --- generic enable/disable for optional sections ---
  function enableCards() {
    const proto: LandingFeatureCards = { eyebrow: "", heading: "", intro: "", cards: [{ icon: "CheckCircle", title: "", body: "" }] };
    onChange({ ...value, featureCards: proto });
  }
  function enableSteps() {
    const proto: LandingSteps = { eyebrow: "", heading: "", intro: "", highlightStep: undefined, steps: [{ title: "", body: "" }] };
    onChange({ ...value, steps: proto });
  }
  function enableAudience() {
    const proto: LandingAudience = { heading: "", columns: [{ icon: "User", title: "", body: "", linkText: "", linkHref: "/booking" }] };
    onChange({ ...value, audience: proto });
  }
  function enableFaq() {
    const proto: LandingFaq = { heading: "", intro: "", items: [{ question: "", answer: "" }] };
    onChange({ ...value, faq: proto });
  }
  function disable(key: "featureCards" | "steps" | "audience" | "faq") {
    const next = { ...value };
    delete next[key];
    onChange(next);
  }

  // --- immutable list helpers ---
  function setList(section: "featureCards" | "steps" | "audience" | "faq", key: string, list: unknown[]) {
    const current = (value as unknown as Record<string, unknown>)[section];
    if (!current) return;
    onChange({ ...value, [section]: { ...(current as object), [key]: list } } as ServiceLanding);
  }

  function moveItem<T>(list: T[], index: number, delta: number): T[] {
    const target = index + delta;
    if (target < 0 || target >= list.length) return list;
    const next = [...list];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  }

  const seoTitleLen = (value.seo?.title || "").length;
  const seoDescLen = (value.seo?.description || "").length;

  return (
    <div className="space-y-4">

      {/* Intro note */}
      <div className="bg-secondary/5 border border-secondary/30 rounded-xl px-4 py-3 text-sm text-muted">
        Landing page content for <span className="font-mono">/services/[slug]</span>. Fill the hero,
        enable the sections you want, then tick <em>Publish landing page</em> in the Visibility panel
        to make the page live.
      </div>

      {/* SEO */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>Landing — SEO</p>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className={labelCls}>
              Meta title
              <span className={`ml-2 font-normal normal-case ${seoTitleLen > 60 ? "text-error" : "text-muted-light"}`}>
                {seoTitleLen}/60
              </span>
            </label>
            <input
              type="text"
              value={value.seo?.title || ""}
              onChange={(e) => onChange({ ...value, seo: { ...value.seo, title: e.target.value } })}
              placeholder="e.g. Hearing Aid Fittings in Hamilton | Veritas Hearing"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
          <div>
            <label className={labelCls}>
              Meta description
              <span className={`ml-2 font-normal normal-case ${seoDescLen > 160 ? "text-error" : "text-muted-light"}`}>
                {seoDescLen}/160
              </span>
            </label>
            <textarea
              value={value.seo?.description || ""}
              onChange={(e) => onChange({ ...value, seo: { ...value.seo, description: e.target.value } })}
              rows={2}
              className={inputCls}
            />
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>Landing — Hero</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Headline</label>
            <input
              type="text"
              value={value.hero.headline}
              onChange={(e) => setHero({ headline: e.target.value })}
              placeholder="e.g. Hearing aid fittings,"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
          <div>
            <label className={labelCls}>Headline accent <span className="normal-case font-normal">(gold tail)</span></label>
            <input
              type="text"
              value={value.hero.headlineAccent || ""}
              onChange={(e) => setHero({ headlineAccent: e.target.value })}
              placeholder="e.g. measured — not guessed"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
        </div>
        <div>
          <label className={labelCls}>Intro</label>
          <textarea
            value={value.hero.intro}
            onChange={(e) => setHero({ intro: e.target.value })}
            rows={3}
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Primary button text</label>
            <input
              type="text"
              value={value.hero.primaryCtaText || ""}
              onChange={(e) => setHero({ primaryCtaText: e.target.value })}
              placeholder="Book a hearing test"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
          <div>
            <label className={labelCls}>Second button</label>
            <select
              value={value.hero.secondaryCta || "call"}
              onChange={(e) => setHero({ secondaryCta: e.target.value as LandingHero["secondaryCta"] })}
              className={inputCls}
            >
              <option value="call">Phone call button</option>
              <option value="none">None (booking button only)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Trust line <span className="normal-case font-normal">(under buttons)</span></label>
            <input
              type="text"
              value={value.hero.trustLine || ""}
              onChange={(e) => setHero({ trustLine: e.target.value })}
              placeholder="Independent clinic · Every hearing aid brand"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
          <div>
            <label className={labelCls}>Hero visual</label>
            <select
              value={value.hero.visual || "auto"}
              onChange={(e) =>
                setHero({ visual: e.target.value === "auto" ? undefined : (e.target.value as LandingHero["visual"]) })
              }
              className={inputCls}
            >
              <option value="auto">Service image (if set)</option>
              <option value="chart">Real-ear measurement chart</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <SectionCard
        title="Landing — Feature cards"
        hint="Three-up icon cards on the cream band (the “why” section)."
        enabled={!!value.featureCards}
        onEnable={enableCards}
        onDisable={() => disable("featureCards")}
      >
        {value.featureCards && (
          <>
            <SectionHeadingFields
              eyebrow={value.featureCards.eyebrow}
              heading={value.featureCards.heading}
              intro={value.featureCards.intro}
              onEyebrow={(v) => onChange({ ...value, featureCards: { ...value.featureCards!, eyebrow: v } })}
              onHeading={(v) => onChange({ ...value, featureCards: { ...value.featureCards!, heading: v } })}
              onIntro={(v) => onChange({ ...value, featureCards: { ...value.featureCards!, intro: v } })}
            />
            {value.featureCards.cards.map((card, i) => (
              <ItemCard
                key={i}
                label={`Card ${i + 1}`}
                index={i}
                total={value.featureCards!.cards.length}
                onMove={(delta) =>
                  setList("featureCards", "cards", moveItem(value.featureCards!.cards, i, delta))
                }
                onRemove={() =>
                  setList("featureCards", "cards", value.featureCards!.cards.filter((_, j) => j !== i))
                }
              >
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-1">
                    <IconPicker compact value={card.icon} onChange={(icon) => {
                      const cards = [...value.featureCards!.cards];
                      cards[i] = { ...card, icon };
                      setList("featureCards", "cards", cards);
                    }} />
                  </div>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      const cards = [...value.featureCards!.cards];
                      cards[i] = { ...card, title: e.target.value };
                      setList("featureCards", "cards", cards);
                    }}
                    placeholder="Card title"
                    className={`${inputCls} sm:col-span-3 placeholder:text-muted-light`}
                  />
                </div>
                <textarea
                  value={card.body}
                  onChange={(e) => {
                    const cards = [...value.featureCards!.cards];
                    cards[i] = { ...card, body: e.target.value };
                    setList("featureCards", "cards", cards);
                  }}
                  rows={2}
                  placeholder="Card body text"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </ItemCard>
            ))}
            <AddButton
              onClick={() =>
                setList("featureCards", "cards", [
                  ...value.featureCards!.cards,
                  { icon: "CheckCircle", title: "", body: "" },
                ])
              }
            />
          </>
        )}
      </SectionCard>

      {/* Steps */}
      <SectionCard
        title="Landing — Step by step"
        hint="Numbered cards; one step can be highlighted in gold."
        enabled={!!value.steps}
        onEnable={enableSteps}
        onDisable={() => disable("steps")}
      >
        {value.steps && (
          <>
            <SectionHeadingFields
              eyebrow={value.steps.eyebrow}
              heading={value.steps.heading}
              intro={value.steps.intro}
              onEyebrow={(v) => onChange({ ...value, steps: { ...value.steps!, eyebrow: v } })}
              onHeading={(v) => onChange({ ...value, steps: { ...value.steps!, heading: v } })}
              onIntro={(v) => onChange({ ...value, steps: { ...value.steps!, intro: v } })}
            />
            <div className="max-w-56">
              <label className={labelCls}>Highlight step # <span className="normal-case font-normal">(1-based, blank = none)</span></label>
              <input
                type="number"
                min={1}
                max={value.steps.steps.length || 1}
                value={value.steps.highlightStep || ""}
                onChange={(e) =>
                  onChange({
                    ...value,
                    steps: {
                      ...value.steps!,
                      highlightStep: e.target.value ? parseInt(e.target.value, 10) : undefined,
                    },
                  })
                }
                className={inputCls}
              />
            </div>
            {value.steps.steps.map((step, i) => (
              <ItemCard
                key={i}
                label={`Step ${i + 1}`}
                index={i}
                total={value.steps!.steps.length}
                onMove={(delta) => setList("steps", "steps", moveItem(value.steps!.steps, i, delta))}
                onRemove={() => setList("steps", "steps", value.steps!.steps.filter((_, j) => j !== i))}
              >
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const steps = [...value.steps!.steps];
                    steps[i] = { ...step, title: e.target.value };
                    setList("steps", "steps", steps);
                  }}
                  placeholder="Step title"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
                <textarea
                  value={step.body}
                  onChange={(e) => {
                    const steps = [...value.steps!.steps];
                    steps[i] = { ...step, body: e.target.value };
                    setList("steps", "steps", steps);
                  }}
                  rows={2}
                  placeholder="Step description"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </ItemCard>
            ))}
            <AddButton
              onClick={() => setList("steps", "steps", [...value.steps!.steps, { title: "", body: "" }])}
            />
          </>
        )}
      </SectionCard>

      {/* Audience */}
      <SectionCard
        title="Landing — Who it's for"
        hint="Green band with centred icon columns and a link under each."
        enabled={!!value.audience}
        onEnable={enableAudience}
        onDisable={() => disable("audience")}
      >
        {value.audience && (
          <>
            <div>
              <label className={labelCls}>Heading</label>
              <input
                type="text"
                value={value.audience.heading}
                onChange={(e) => onChange({ ...value, audience: { ...value.audience!, heading: e.target.value } })}
                placeholder="e.g. Wherever you're starting from"
                className={`${inputCls} placeholder:text-muted-light`}
              />
            </div>
            {value.audience.columns.map((column, i) => (
              <ItemCard
                key={i}
                label={`Column ${i + 1}`}
                index={i}
                total={value.audience!.columns.length}
                onMove={(delta) => setList("audience", "columns", moveItem(value.audience!.columns, i, delta))}
                onRemove={() => setList("audience", "columns", value.audience!.columns.filter((_, j) => j !== i))}
              >
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-1">
                    <IconPicker compact value={column.icon} onChange={(icon) => {
                      const columns = [...value.audience!.columns];
                      columns[i] = { ...column, icon };
                      setList("audience", "columns", columns);
                    }} />
                  </div>
                  <input
                    type="text"
                    value={column.title}
                    onChange={(e) => {
                      const columns = [...value.audience!.columns];
                      columns[i] = { ...column, title: e.target.value };
                      setList("audience", "columns", columns);
                    }}
                    placeholder="Column title"
                    className={`${inputCls} sm:col-span-3 placeholder:text-muted-light`}
                  />
                </div>
                <textarea
                  value={column.body}
                  onChange={(e) => {
                    const columns = [...value.audience!.columns];
                    columns[i] = { ...column, body: e.target.value };
                    setList("audience", "columns", columns);
                  }}
                  rows={3}
                  placeholder="Column body text"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={column.linkText || ""}
                    onChange={(e) => {
                      const columns = [...value.audience!.columns];
                      columns[i] = { ...column, linkText: e.target.value };
                      setList("audience", "columns", columns);
                    }}
                    placeholder="Link text (e.g. Book a hearing test →)"
                    className={`${inputCls} placeholder:text-muted-light`}
                  />
                  <input
                    type="text"
                    value={column.linkHref || ""}
                    onChange={(e) => {
                      const columns = [...value.audience!.columns];
                      columns[i] = { ...column, linkHref: e.target.value };
                      setList("audience", "columns", columns);
                    }}
                    placeholder="Link URL (/booking or tel:02904510839)"
                    className={`${inputCls} placeholder:text-muted-light`}
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              onClick={() =>
                setList("audience", "columns", [
                  ...value.audience!.columns,
                  { icon: "User", title: "", body: "", linkText: "", linkHref: "/booking" },
                ])
              }
            />
          </>
        )}
      </SectionCard>

      {/* FAQ */}
      <SectionCard
        title="Landing — FAQ"
        hint="Accordion on the landing page (separate from the homepage FAQs)."
        enabled={!!value.faq}
        onEnable={enableFaq}
        onDisable={() => disable("faq")}
      >
        {value.faq && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Heading <span className="normal-case font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={value.faq.heading || ""}
                  onChange={(e) => onChange({ ...value, faq: { ...value.faq!, heading: e.target.value } })}
                  placeholder="Frequently Asked Questions"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </div>
              <div>
                <label className={labelCls}>Intro <span className="normal-case font-normal">(optional)</span></label>
                <input
                  type="text"
                  value={value.faq.intro || ""}
                  onChange={(e) => onChange({ ...value, faq: { ...value.faq!, intro: e.target.value } })}
                  className={inputCls}
                />
              </div>
            </div>
            {value.faq.items.map((item, i) => (
              <ItemCard
                key={i}
                label={`Question ${i + 1}`}
                index={i}
                total={value.faq!.items.length}
                onMove={(delta) => setList("faq", "items", moveItem(value.faq!.items, i, delta))}
                onRemove={() => setList("faq", "items", value.faq!.items.filter((_, j) => j !== i))}
              >
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => {
                    const items = [...value.faq!.items];
                    items[i] = { ...item, question: e.target.value };
                    setList("faq", "items", items);
                  }}
                  placeholder="Question"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => {
                    const items = [...value.faq!.items];
                    items[i] = { ...item, answer: e.target.value };
                    setList("faq", "items", items);
                  }}
                  rows={2}
                  placeholder="Answer"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
                <textarea
                  value={item.answerZh || ""}
                  onChange={(e) => {
                    const items = [...value.faq!.items];
                    items[i] = { ...item, answerZh: e.target.value };
                    setList("faq", "items", items);
                  }}
                  rows={2}
                  placeholder="Optional Traditional Chinese paragraph (shown below the answer)"
                  className={`${inputCls} placeholder:text-muted-light`}
                />
              </ItemCard>
            ))}
            <AddButton
              onClick={() => setList("faq", "items", [...value.faq!.items, { question: "", answer: "" }])}
            />
          </>
        )}
      </SectionCard>

      {/* Closing CTA */}
      <div className={cardCls}>
        <p className={sectionTitleCls}>Landing — Closing CTA</p>
        <p className="text-xs text-muted-light -mt-1">
          Buttons are fixed (Book Assessment + phone). Leave blank for the defaults.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Heading</label>
            <input
              type="text"
              value={value.cta?.heading || ""}
              onChange={(e) => onChange({ ...value, cta: { ...value.cta, heading: e.target.value } })}
              placeholder="It all starts with a hearing test"
              className={`${inputCls} placeholder:text-muted-light`}
            />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <input
              type="text"
              value={value.cta?.description || ""}
              onChange={(e) => onChange({ ...value, cta: { ...value.cta, description: e.target.value } })}
              className={inputCls}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

function SectionCard({
  title,
  hint,
  enabled,
  onEnable,
  onDisable,
  children,
}: {
  title: string;
  hint?: string;
  enabled: boolean;
  onEnable: () => void;
  onDisable: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className={cardCls}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={sectionTitleCls}>{title}</p>
          {hint && <p className="text-xs text-muted-light">{hint}</p>}
        </div>
        <label className="flex items-center gap-2 cursor-pointer shrink-0 pt-0.5">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => (e.target.checked ? onEnable() : onDisable())}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-xs text-foreground">Show section</span>
        </label>
      </div>
      {enabled && <div className="space-y-3 pt-1">{children}</div>}
    </div>
  );
}

function SectionHeadingFields({
  eyebrow,
  heading,
  intro,
  onEyebrow,
  onHeading,
  onIntro,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
  onEyebrow: (v: string) => void;
  onHeading: (v: string) => void;
  onIntro: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div>
        <label className={labelCls}>Eyebrow</label>
        <input type="text" value={eyebrow || ""} onChange={(e) => onEyebrow(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Heading</label>
        <input type="text" value={heading} onChange={(e) => onHeading(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Intro</label>
        <input type="text" value={intro || ""} onChange={(e) => onIntro(e.target.value)} className={inputCls} />
      </div>
    </div>
  );
}

function ItemCard({
  label,
  index,
  total,
  onMove,
  onRemove,
  children,
}: {
  label: string;
  index: number;
  total: number;
  onMove: (delta: number) => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background rounded-lg border border-border p-3 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} className={iconBtnCls} title="Move up">
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} className={iconBtnCls} title="Move down">
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={onRemove} className={iconBtnCls} title="Remove">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-foreground hover:bg-card border border-border border-dashed transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      Add
    </button>
  );
}
