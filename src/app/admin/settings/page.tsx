'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cog6ToothIcon,
  BuildingOffice2Icon,
  BellIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

interface SystemSettings {
  id: string;
  clinicName: string;
  clinicEmail: string;
  clinicPhone: string;
  address: string;
  timezone: string;
  currency: string;
  taxRate: number;
  appointmentBuffer: number;
  cancellationWindow: number;
  defaultReminder: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

type TabType = 'clinic' | 'appointments' | 'billing' | 'notifications';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('clinic');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState<Partial<SystemSettings>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setMessage({ type: 'error', text: 'Failed to load settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
        setMessage({ type: 'success', text: 'Settings saved successfully' });
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save settings' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SystemSettings, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'clinic', label: 'Clinic Info', icon: BuildingOffice2Icon },
    { id: 'appointments', label: 'Appointments', icon: ClockIcon },
    { id: 'billing', label: 'Billing', icon: CurrencyDollarIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon }
  ];

  const InputField = ({ 
    label, 
    field, 
    type = 'text',
    placeholder,
    helpText,
    suffix
  }: { 
    label: string; 
    field: keyof SystemSettings;
    type?: string;
    placeholder?: string;
    helpText?: string;
    suffix?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={formData[field] as string | number || ''}
          onChange={(e) => handleChange(field, type === 'number' ? Number(e.target.value) : e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{suffix}</span>
        )}
      </div>
      {helpText && (
        <p className="text-sm text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  );

  const ToggleField = ({
    label,
    field,
    helpText
  }: {
    label: string;
    field: keyof SystemSettings;
    helpText?: string;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        <label className="font-medium text-gray-900">{label}</label>
        {helpText && (
          <p className="text-sm text-gray-500">{helpText}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => handleChange(field, !formData[field])}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          formData[field] ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            formData[field] ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure your clinic&apos;s system preferences</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircleIcon className="h-5 w-5 mr-2" />
          ) : (
            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          )}
          {message.text}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        {activeTab === 'clinic' && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <BuildingOffice2Icon className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Clinic Information</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Basic information about your clinic that appears on invoices and communications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Clinic Name" 
                field="clinicName" 
                placeholder="Veritas Hearing"
              />
              <InputField 
                label="Email Address" 
                field="clinicEmail" 
                type="email"
                placeholder="info@veritashearing.co.nz"
              />
              <InputField 
                label="Phone Number" 
                field="clinicPhone" 
                placeholder="0800 555 051"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timezone
                </label>
                <select
                  value={formData.timezone || 'Pacific/Auckland'}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Pacific/Auckland">Pacific/Auckland (NZST)</option>
                  <option value="Pacific/Chatham">Pacific/Chatham</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                rows={3}
                placeholder="42a Hillcrest Road, Hillcrest, Hamilton 3216"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <ClockIcon className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Appointment Settings</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Configure default appointment scheduling and notification preferences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Buffer Between Appointments" 
                field="appointmentBuffer" 
                type="number"
                helpText="Time in minutes between appointments for preparation"
                suffix="min"
              />
              <InputField 
                label="Cancellation Window" 
                field="cancellationWindow" 
                type="number"
                helpText="Minimum hours notice required for cancellations"
                suffix="hrs"
              />
              <InputField 
                label="Default Reminder Time" 
                field="defaultReminder" 
                type="number"
                helpText="Hours before appointment to send reminder"
                suffix="hrs"
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Appointment Policies</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  <strong>Cancellation Policy:</strong> Appointments must be cancelled at least{' '}
                  <span className="text-primary font-medium">{formData.cancellationWindow || 24} hours</span> in advance.
                  Late cancellations may be subject to a cancellation fee.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Billing Settings</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Configure currency, tax rates, and default billing options.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  value={formData.currency || 'NZD'}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="NZD">NZD - New Zealand Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
              <InputField 
                label="GST Rate" 
                field="taxRate" 
                type="number"
                helpText="Default GST rate applied to invoices"
                suffix="%"
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Payment Methods Accepted</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['Cash', 'EFTPOS/Card', 'Bank Transfer', 'ACC', 'Insurance'].map((method) => (
                  <div 
                    key={method}
                    className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium"
                  >
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    {method}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Invoice Preview</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{formData.clinicName || 'Veritas Hearing'}</p>
                    <p className="text-sm text-gray-600">{formData.address || '42a Hillcrest Road, Hillcrest, Hamilton 3216'}</p>
                    <p className="text-sm text-gray-600">{formData.clinicPhone || '0800 555 051'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Invoice #INV-2024-001</p>
                    <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString('en-NZ')}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>$100.00</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>GST ({formData.taxRate || 15}%)</span>
                    <span>${((100 * (formData.taxRate || 15)) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                    <span>Total ({formData.currency || 'NZD'})</span>
                    <span>${(100 + (100 * (formData.taxRate || 15)) / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex items-center mb-4">
              <BellIcon className="h-6 w-6 text-primary mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Configure how your clinic sends notifications to patients.
            </p>
            
            <div className="divide-y divide-gray-200">
              <ToggleField
                label="Email Notifications"
                field="emailNotifications"
                helpText="Send appointment confirmations and reminders via email"
              />
              <ToggleField
                label="SMS Notifications"
                field="smsNotifications"
                helpText="Send appointment reminders via SMS (additional charges may apply)"
              />
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-medium text-gray-900 mb-4">Notification Templates</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Appointment Confirmation</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sent when a new appointment is booked or confirmed.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Appointment Reminder</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sent {formData.defaultReminder || 24} hours before the appointment.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Appointment Cancellation</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sent when an appointment is cancelled.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">Invoice Notification</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Sent when a new invoice is generated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
