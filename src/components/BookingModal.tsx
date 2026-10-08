import React, { useState, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { servicesData } from '../config/services';
import { barbersData } from '../config/barbers';
import { X, CheckCircle2, User, Phone } from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { isBookingOpen, selectedService, selectedBarber, closeBooking } = useBooking();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    barber: '',
    date: '',
    time: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
    if (selectedBarber) {
      setFormData((prev) => ({ ...prev, barber: selectedBarber }));
    }
  }, [selectedService, selectedBarber]);

  if (!isBookingOpen) return null;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 8) err.phone = 'Valid phone number is required';
    if (!formData.service) err.service = 'Please select a service';
    if (!formData.date) err.date = 'Please select a date';
    if (!formData.time) err.time = 'Please select a time';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury booking transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      service: '',
      barber: '',
      date: '',
      time: '',
      notes: '',
    });
    setErrors({});
    closeBooking();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0B0A09]/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#14110F] border border-[#C8A46A]/30 shadow-2xl p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 text-[#8C847A] hover:text-[#C8A46A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {isSubmitted ? (
          /* Success State */
          <div className="text-center py-10 space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#C8A46A]/20 border border-[#C8A46A] text-[#C8A46A] flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-2 block">
                // APPOINTMENT PENDING CONFIRMATION
              </span>
              <h3 className="font-display text-4xl font-black uppercase text-[#F2EBDD]">
                REQUEST RECEIVED
              </h3>
              <p className="font-serif italic text-lg text-[#8C847A] mt-2">
                “Your appointment request has been noted.”
              </p>
            </div>

            <div className="p-5 bg-[#0B0A09] border border-[#F2EBDD]/10 text-left space-y-2 text-xs font-mono text-[#8C847A]">
              <p><span className="text-[#F2EBDD]">PATRON:</span> {formData.name}</p>
              <p><span className="text-[#F2EBDD]">PHONE:</span> {formData.phone}</p>
              <p><span className="text-[#F2EBDD]">DATE &amp; TIME:</span> {formData.date} at {formData.time}</p>
              <p><span className="text-[#F2EBDD]">CHAIR:</span> {formData.barber || 'First Available Master'}</p>
            </div>

            <p className="text-xs text-[#8C847A] font-sans max-w-sm mx-auto">
              Our concierge will contact you via WhatsApp or Call to confirm your bespoke reservation slot.
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-display font-bold text-xs tracking-[0.2em] uppercase transition-all"
            >
              RETURN TO ATELIER
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="mb-8">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C8A46A] mb-1 block">
                // BESPOKE RESERVATION
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#F2EBDD] tracking-tight">
                REQUEST YOUR CHAIR
              </h3>
              <p className="text-xs font-sans text-[#8C847A] mt-1">
                Select your tailored ritual. Our concierge will confirm availability.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C847A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord Vikramaditya"
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] placeholder-[#8C847A]/50 focus:outline-none transition-colors font-sans"
                  />
                </div>
                {errors.name && <p className="text-[10px] font-mono text-red-400 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C847A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] placeholder-[#8C847A]/50 focus:outline-none transition-colors font-sans"
                  />
                </div>
                {errors.phone && <p className="text-[10px] font-mono text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* Service & Barber Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                    Ritual / Service *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] focus:outline-none transition-colors font-sans"
                  >
                    <option value="">Select Ritual</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.startingPrice})
                      </option>
                    ))}
                  </select>
                  {errors.service && <p className="text-[10px] font-mono text-red-400 mt-1">{errors.service}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                    Preferred Artisan
                  </label>
                  <select
                    value={formData.barber}
                    onChange={(e) => setFormData({ ...formData, barber: e.target.value })}
                    className="w-full px-3.5 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] focus:outline-none transition-colors font-sans"
                  >
                    <option value="">First Available Master</option>
                    {barbersData.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} ({b.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] focus:outline-none transition-colors font-sans"
                    />
                  </div>
                  {errors.date && <p className="text-[10px] font-mono text-red-400 mt-1">{errors.date}</p>}
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase tracking-wider text-[#8C847A] mb-1.5 block">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-3 bg-[#0B0A09] border border-[#F2EBDD]/15 focus:border-[#C8A46A] text-sm text-[#F2EBDD] focus:outline-none transition-colors font-sans"
                  >
                    <option value="">Select Time Slot</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:30 PM">07:30 PM</option>
                  </select>
                  {errors.time && <p className="text-[10px] font-mono text-red-400 mt-1">{errors.time}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="BOOK"
                  className="w-full py-4 bg-[#C8A46A] hover:bg-[#DFC18A] text-[#0B0A09] font-display font-black text-sm tracking-[0.2em] uppercase transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING REQUEST...' : 'REQUEST APPOINTMENT'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
