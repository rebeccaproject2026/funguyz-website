import React, { useState } from 'react';
import { Calendar, Clock, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string, timeSlot: string) => void;
}

export function SchedulingModal({ isOpen, onClose, onConfirm }: SchedulingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [calendarDate, setCalendarDate] = useState(new Date('2026-06-01T00:00:00'));

  if (!isOpen) return null;

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handlePrevMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const isDateDisabled = (day: number) => {
    const d = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    const launchDate = new Date('2026-06-25T00:00:00'); // Lock out dates before June 25th
    return d < launchDate;
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert('Please select both a date and a time slot.');
      return;
    }
    onConfirm(selectedDate, selectedTimeSlot);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/75 ">
      <div className="bg-white rounded-3xl w-full max-w-[800px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-scale-up border border-slate-100/50">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-slate-400 hover:text-slate-800 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column */}
        <div className="w-full md:w-[380px] bg-gradient-to-b from-[#1a1625] to-[#14101d] p-6 md:p-8 text-white flex flex-col relative shrink-0">

          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff4fa3]/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full">
            <div>
              <h3 className="text-[20px] font-black uppercase text-white logo-font mb-1 tracking-wide leading-[1.1]">
                Schedule Your<br /><span className="text-[#ff4fa3]">Discreet</span> Delivery
              </h3>
              <p className="text-[11px] font-medium text-slate-400/90 mt-1 leading-relaxed pr-4">
                Select a secure delivery window that works for you. <br />(Fulfillment starts June 25th)
              </p>
            </div>

            {/* Custom Visual Calendar UI */}
            <div className="mt-4 bg-white text-[#1b1533] rounded-3xl p-4 shadow-xl relative w-full max-w-[320px] mx-auto flex-1">

              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-1 hover:text-[#ff4fa3] transition-colors cursor-pointer text-slate-400">
                  <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
                </button>
                <span className="text-xs font-black uppercase tracking-widest logo-font text-[#1b1533]">
                  {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                </span>
                <button onClick={handleNextMonth} className="p-1 hover:text-[#ff4fa3] transition-colors cursor-pointer text-slate-400">
                  <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Calendar Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} className="text-[10px] font-black uppercase tracking-widest text-[#1b1533]/40">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-y-1 gap-x-1">
                {Array.from({ length: getFirstDayOfMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => (
                  <div key={`blank-${i}`} className="h-7" />
                ))}
                {Array.from({ length: getDaysInMonth(calendarDate.getFullYear(), calendarDate.getMonth()) }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDateDisabled(day);
                  const fullDateString = `${calendarDate.getFullYear()}-${String(calendarDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = selectedDate === fullDateString;

                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => setSelectedDate(fullDateString)}
                      className={`h-7 w-7 mx-auto rounded-full text-[12px] flex items-center justify-center transition-all ${disabled
                          ? 'text-slate-300 font-semibold cursor-not-allowed'
                          : isSelected
                            ? 'bg-[#1a1625] text-white font-black shadow-md'
                            : 'text-[#1b1533] font-black hover:bg-slate-100 cursor-pointer'
                        }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-start gap-3 text-[11px] text-slate-400/80 font-medium pt-1">
              <Calendar className="h-4.5 w-4.5 shrink-0 text-[#ff4fa3]" />
              <p className="leading-relaxed pr-2">All orders placed today will be vacuum-sealed and held securely. Deliveries will commence on our official Grand Opening launch date.</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 bg-white p-5 md:p-6 flex flex-col justify-center">
          
          <div className="space-y-4">
            {/* Delivery Hours Banner */}
            <div className="bg-[#f8f9fa] rounded-2xl p-4 flex gap-4 items-center border border-pink-100/50">
              <div className="h-10 w-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0 border border-pink-100/50">
                <Clock className="h-5 w-5 text-[#ff4fa3] stroke-[2.2]" />
              </div>
              <div className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                <strong className="block text-xs font-black uppercase tracking-wider text-[#1b1533] logo-font mb-0.5">Discreet Delivery Hours</strong>
                <span>Monday - Thursday: 8:00 AM to 8:00 PM</span><br />
                <span>Friday - Saturday: 8:00 AM to 12:00 AM</span>
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h4 className="text-[14px] font-black uppercase tracking-wider text-[#1b1533] logo-font mb-1">Select a Delivery Time</h4>
              <span className="block text-[11px] text-slate-400 mb-3 font-semibold">Choose a 4-hour window that works for you</span>

              <div className="grid sm:grid-cols-2 gap-3">
                {['8:00 AM - 12:00 PM', '12:00 PM - 4:00 PM', '4:00 PM - 8:00 PM', '8:00 PM - 12:00 AM'].map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-3 px-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${selectedTimeSlot === slot
                        ? 'border-[#1b1533] bg-white text-[#1b1533] shadow-sm ring-1 ring-[#1b1533]'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Important Info Alert */}
            <div className="bg-slate-50 rounded-2xl p-4 flex gap-3.5 items-start border border-slate-100">
              <div className="h-5 w-5 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                <Info className="h-3 w-3 text-white stroke-[3]" />
              </div>
              <p className="text-[11px] font-semibold text-slate-600/90 leading-relaxed">
                <strong className="text-slate-800 block mb-0.5 uppercase tracking-wider text-[9px] font-black">100% Private & Secure</strong>
                Delivery times are estimated. All packages are vacuum-sealed with zero external branding. Our private courier will contact you directly via secure SMS when your order is out for delivery.
              </p>
            </div>
          </div>

          {/* Confirm Action */}
          <button
            onClick={handleConfirm}
            className="mt-6 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#ff4fa3] to-[#e03b87] text-white py-4 text-xs font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(255,79,163,0.25)] transition-all duration-300 hover:shadow-[0_12px_25px_rgba(255,79,163,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer logo-font"
          >
            Confirm Delivery Time
          </button>

        </div>
      </div>
    </div>
  );
}
