'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  UsersIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  DocumentArrowDownIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface ReportData {
  period: {
    start: string;
    end: string;
  };
  appointments: {
    total: number;
    completed: number;
    cancelled: number;
    noShow: number;
    scheduled: number;
  };
  revenue: {
    totalBilled: number;
    totalPaid: number;
    outstanding: number;
    collectionRate: number;
  };
  patients: {
    total: number;
    new: number;
  };
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate
      });
      const response = await fetch(`/api/admin/reports?${params}`);
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD'
    }).format(amount);
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const exportReport = () => {
    if (!reportData) return;
    
    const csvContent = [
      ['Report Period', `${dateRange.startDate} to ${dateRange.endDate}`],
      [],
      ['Appointment Statistics'],
      ['Total Appointments', reportData.appointments.total],
      ['Completed', reportData.appointments.completed],
      ['Cancelled', reportData.appointments.cancelled],
      ['No Shows', reportData.appointments.noShow],
      ['Scheduled', reportData.appointments.scheduled],
      [],
      ['Revenue'],
      ['Total Billed', reportData.revenue.totalBilled],
      ['Total Paid', reportData.revenue.totalPaid],
      ['Outstanding', reportData.revenue.outstanding],
      ['Collection Rate', `${reportData.revenue.collectionRate.toFixed(1)}%`],
      [],
      ['Patient Statistics'],
      ['Total Patients', reportData.patients.total],
      ['New Patients', reportData.patients.new]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${dateRange.startDate}-to-${dateRange.endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    trendValue,
    color = 'primary'
  }: { 
    title: string; 
    value: string | number; 
    subtitle?: string;
    icon: React.ElementType; 
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    color?: 'primary' | 'green' | 'yellow' | 'red';
  }) => {
    const colorClasses = {
      primary: 'bg-primary/10 text-primary',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      red: 'bg-red-100 text-red-600'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          {trend && trendValue && (
            <div className={`flex items-center text-sm ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
              ) : trend === 'down' ? (
                <ArrowTrendingDownIcon className="h-4 w-4 mr-1" />
              ) : null}
              {trendValue}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </motion.div>
    );
  };

  const ProgressBar = ({ label, value, total, color = 'primary' }: {
    label: string;
    value: number;
    total: number;
    color?: string;
  }) => {
    const percentage = calculatePercentage(value, total);
    const colorClasses: Record<string, string> = {
      primary: 'bg-primary',
      green: 'bg-green-500',
      yellow: 'bg-yellow-500',
      red: 'bg-red-500',
      blue: 'bg-blue-500'
    };

    return (
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-900 font-medium">{value} ({percentage}%)</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`${colorClasses[color] || colorClasses.primary} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">View clinic performance metrics and insights</p>
        </div>
        <button
          onClick={exportReport}
          disabled={loading || !reportData}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </div>

      {/* Date Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center text-gray-600">
            <FunnelIcon className="h-5 w-5 mr-2" />
            <span className="font-medium">Date Range:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">From</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">To</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={() => {
                const today = new Date();
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                setDateRange({
                  startDate: firstDayOfMonth.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                });
              }}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              This Month
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
                setDateRange({
                  startDate: firstDayOfYear.toISOString().split('T')[0],
                  endDate: today.toISOString().split('T')[0]
                });
              }}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              This Year
            </button>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : reportData ? (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Appointments"
              value={reportData.appointments.total}
              subtitle={`${reportData.appointments.completed} completed`}
              icon={CalendarDaysIcon}
              color="primary"
            />
            <StatCard
              title="Total Revenue"
              value={formatCurrency(reportData.revenue.totalBilled)}
              subtitle={`${formatCurrency(reportData.revenue.totalPaid)} collected`}
              icon={CurrencyDollarIcon}
              color="green"
            />
            <StatCard
              title="Outstanding"
              value={formatCurrency(reportData.revenue.outstanding)}
              subtitle="Awaiting payment"
              icon={CurrencyDollarIcon}
              color="yellow"
            />
            <StatCard
              title="Total Patients"
              value={reportData.patients.total}
              subtitle={`${reportData.patients.new} new`}
              icon={UsersIcon}
              color="primary"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appointment Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarDaysIcon className="h-5 w-5 mr-2 text-primary" />
                Appointment Status
              </h2>
              <div className="space-y-2">
                <ProgressBar 
                  label="Completed" 
                  value={reportData.appointments.completed} 
                  total={reportData.appointments.total}
                  color="green"
                />
                <ProgressBar 
                  label="Cancelled" 
                  value={reportData.appointments.cancelled} 
                  total={reportData.appointments.total}
                  color="yellow"
                />
                <ProgressBar 
                  label="No Shows" 
                  value={reportData.appointments.noShow} 
                  total={reportData.appointments.total}
                  color="red"
                />
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completion Rate</span>
                  <span className="font-semibold text-green-600">
                    {calculatePercentage(reportData.appointments.completed, reportData.appointments.total)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Revenue Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CurrencyDollarIcon className="h-5 w-5 mr-2 text-primary" />
                Revenue Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Paid Revenue</span>
                  <span className="font-semibold text-green-700">{formatCurrency(reportData.revenue.totalPaid)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-700">Outstanding</span>
                  <span className="font-semibold text-yellow-700">{formatCurrency(reportData.revenue.outstanding)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                  <span className="text-primary">Total Revenue</span>
                  <span className="font-semibold text-primary">{formatCurrency(reportData.revenue.totalBilled)}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Collection Rate</span>
                  <span className="font-semibold text-green-600">
                    {reportData.revenue.collectionRate.toFixed(1)}%
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Appointment Status Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChartBarIcon className="h-5 w-5 mr-2 text-primary" />
                Appointment Breakdown
              </h2>
              <div className="space-y-3">
                <ProgressBar
                  label="Scheduled"
                  value={reportData.appointments.scheduled}
                  total={reportData.appointments.total}
                  color="blue"
                />
                <ProgressBar
                  label="Completed"
                  value={reportData.appointments.completed}
                  total={reportData.appointments.total}
                  color="green"
                />
                <ProgressBar
                  label="Cancelled"
                  value={reportData.appointments.cancelled}
                  total={reportData.appointments.total}
                  color="yellow"
                />
                <ProgressBar
                  label="No Shows"
                  value={reportData.appointments.noShow}
                  total={reportData.appointments.total}
                  color="red"
                />
              </div>
            </motion.div>

            {/* Patient Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <UsersIcon className="h-5 w-5 mr-2 text-primary" />
                Patient Statistics
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">
                      {reportData.patients.new}
                    </p>
                    <p className="text-sm text-blue-700 mt-1">New Patients</p>
                    <p className="text-xs text-blue-600 mt-1">This period</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">
                      {reportData.patients.total}
                    </p>
                    <p className="text-sm text-green-700 mt-1">Total Patients</p>
                    <p className="text-xs text-green-600 mt-1">All time</p>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar
                    label="New Patients (this period)"
                    value={reportData.patients.new}
                    total={reportData.patients.total}
                    color="blue"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No data available</h3>
          <p className="text-gray-500 mt-2">
            There is no report data available for the selected date range.
          </p>
        </div>
      )}
    </div>
  );
}
