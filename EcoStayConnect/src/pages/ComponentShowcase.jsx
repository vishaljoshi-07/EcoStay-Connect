import React, { useState } from 'react';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';
import { Sparkles, Terminal, CheckCircle2, AlertTriangle, AlertOctagon, Heart, Send } from 'lucide-react';

function ComponentShowcase() {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('md');

  // Input states
  const [textVal, setTextVal] = useState('');
  const [errorVal, setErrorVal] = useState('');

  // Toast states
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  const triggerToast = (msg, variant) => {
    setToastMsg(msg);
    setToastVariant(variant);
    setToastOpen(true);
  };

  const handleOpenModal = (size) => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white py-12 text-left relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 to-emerald-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-700/50 rounded-full px-3.5 py-1 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>UI Library v1.0.0</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight">
            Component Design System
          </h1>
          <p className="text-emerald-100/70 text-sm max-w-xl">
            A showcasing playground for all custom UI design system components built for EcoStay Connect. Highly responsive, themeable, and reusable.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 1. BUTTONS SECTION */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6 transition-colors duration-200">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">1. Reusable Buttons</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Supports three variants, three size classes, and disabled states.</p>
            </div>

            {/* Primary Buttons Row */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Primary Variant</span>
              <div className="flex flex-wrap items-end gap-3">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large Size</Button>
                <Button variant="primary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            {/* Secondary Buttons Row */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Secondary Variant</span>
              <div className="flex flex-wrap items-end gap-3">
                <Button variant="secondary" size="sm">Small</Button>
                <Button variant="secondary" size="md">Medium</Button>
                <Button variant="secondary" size="lg">Large Size</Button>
                <Button variant="secondary" size="md" disabled>Disabled</Button>
              </div>
            </div>

            {/* Outline Buttons Row */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Outline Variant</span>
              <div className="flex flex-wrap items-end gap-3">
                <Button variant="outline" size="sm">Small</Button>
                <Button variant="outline" size="md">Medium</Button>
                <Button variant="outline" size="lg">Large Size</Button>
                <Button variant="outline" size="md" disabled>Disabled</Button>
              </div>
            </div>
          </div>

          {/* 2. INPUT FIELDS SECTION */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6 transition-colors duration-200">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">2. Input Fields</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Custom input fields with labels, error states, and helper texts.</p>
            </div>

            <div className="space-y-4">
              {/* Standard Input */}
              <Input
                label="Standard Input"
                placeholder="Enter text here..."
                value={textVal}
                onChange={(e) => {
                  setTextVal(e.target.value);
                  if (e.target.value.length > 5) {
                    setErrorVal('Length cannot be more than 5 characters!');
                  } else {
                    setErrorVal('');
                  }
                }}
                helperText="Type up to 5 characters to test error validation."
              />

              {/* Input with validation error */}
              <Input
                label="Validating Input"
                placeholder="Type something..."
                error={errorVal}
                value={textVal}
                readOnly
                helperText="This field mirrors the input above with validation errors."
              />

              {/* Password configuration */}
              <Input
                label="Secure Password Field"
                type="password"
                placeholder="••••••••"
                helperText="Password values are hidden from plain text screens."
              />
            </div>
          </div>

          {/* 3. MODAL POP-UPS SECTION */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6 transition-colors duration-200">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">3. Modal Windows</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Flexible action pop-ups that support custom sizes, footers, and scroll locks.</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Click the buttons below to trigger the modal dialog with different size presets. Body scrolling will lock in the background when active.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => handleOpenModal('sm')}>Open Small Modal</Button>
                <Button variant="primary" onClick={() => handleOpenModal('md')}>Open Medium Modal</Button>
                <Button variant="outline" onClick={() => handleOpenModal('lg')}>Open Large Modal</Button>
              </div>
            </div>
          </div>

          {/* 4. TOAST NOTIFICATIONS & LOADERS */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-850 p-6 sm:p-8 rounded-3xl shadow-sm text-left space-y-6 transition-colors duration-200">
            <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
              <h2 className="text-lg font-bold font-display text-slate-900 dark:text-white">4. Notifications & Spinners</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Trigger feedback banners and test configurable spinner animations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Toast Triggers */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Toast Feedback Banners</span>
                <div className="flex flex-col gap-2.5">
                  <Button 
                    variant="outline" 
                    className="border-emerald-200 text-emerald-800 hover:bg-emerald-50 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-950/20"
                    onClick={() => triggerToast('Successfully completed audit checklist!', 'success')}
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 mr-2 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    Success Toast
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-amber-200 text-amber-800 hover:bg-amber-50 dark:border-amber-900 dark:text-amber-300 dark:hover:bg-amber-950/20"
                    onClick={() => triggerToast('Low solar reserve warning detected.', 'warning')}
                  >
                    <AlertTriangle className="h-4.5 w-4.5 mr-2 shrink-0 text-amber-600 dark:text-amber-400" />
                    Warning Toast
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="border-rose-200 text-rose-800 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/20"
                    onClick={() => triggerToast('Access denied: Authentication failed.', 'error')}
                  >
                    <AlertOctagon className="h-4.5 w-4.5 mr-2 shrink-0 text-rose-600 dark:text-rose-400" />
                    Error Toast
                  </Button>
                </div>
              </div>

              {/* Spinner States */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Animated Loaders</span>
                <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-around h-34">
                  <div className="text-center">
                    <Loader size="sm" />
                    <span className="text-[10px] text-slate-400 mt-1 block">Small</span>
                  </div>
                  <div className="text-center">
                    <Loader size="md" />
                    <span className="text-[10px] text-slate-400 mt-1 block">Medium</span>
                  </div>
                  <div className="text-center">
                    <Loader size="lg" />
                    <span className="text-[10px] text-slate-400 mt-1 block">Large</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Dynamic Pop-up Modal Container */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`${modalSize.toUpperCase()} Size Modal`}
        size={modalSize}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" size="sm" onClick={() => {
              setIsModalOpen(false);
              triggerToast(`Confirmed ${modalSize} size action item!`, 'success');
            }}>
              Confirm Action
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <p>
            You are viewing the <strong>{modalSize}</strong> configuration modal. This component follows modern design practices, including trapping tab locks, locking main body scroll in the background, closing on backdrop trigger, and dark mode compliance.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
            <Terminal className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Theme parameters and size flags adjust padding and maximum bounding boxes instantly.</span>
          </div>
        </div>
      </Modal>

      {/* Toast Notification Mount */}
      <Toast
        isOpen={toastOpen}
        message={toastMsg}
        variant={toastVariant}
        onDismiss={() => setToastOpen(false)}
      />

    </div>
  );
}

export default ComponentShowcase;
