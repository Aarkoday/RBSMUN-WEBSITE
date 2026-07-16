import React from 'react';

export default function ScheduleStack() {
    return (
        <div className="relative w-full max-w-4xl mx-auto pb-[30vh]">
            <div className="sticky top-[100px] glass-card w-full p-8 md:p-12 rounded-3xl mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505]/80 border border-white/10 backdrop-blur-2xl z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Day 1: Friday</h3>
                <table className="w-full text-left text-gray-300">
                    <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">08:00 AM</td><td className="py-5 px-4 text-lg">Registration & Breakfast</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">09:30 AM</td><td className="py-5 px-4 text-lg">Opening Ceremony</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">11:00 AM</td><td className="py-5 px-4 text-lg">Committee Session I</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">01:00 PM</td><td className="py-5 px-4 text-lg">Lunch Break</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">02:00 PM</td><td className="py-5 px-4 text-lg">Committee Session II</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-blue-400 w-1/3 text-lg">04:30 PM</td><td className="py-5 px-4 text-lg">End of Day 1</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="sticky top-[140px] glass-card w-full p-8 md:p-12 rounded-3xl mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505]/80 border border-white/10 backdrop-blur-2xl z-20">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Day 2: Saturday</h3>
                <table className="w-full text-left text-gray-300">
                    <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">08:30 AM</td><td className="py-5 px-4 text-lg">Arrival & Tea</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">09:00 AM</td><td className="py-5 px-4 text-lg">Committee Session III</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">12:30 PM</td><td className="py-5 px-4 text-lg">Lunch Break</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">01:30 PM</td><td className="py-5 px-4 text-lg">Committee Session IV</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">04:00 PM</td><td className="py-5 px-4 text-lg">High Tea & Networking</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-purple-400 w-1/3 text-lg">05:00 PM</td><td className="py-5 px-4 text-lg">Delegate Dance / Social Event</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="sticky top-[180px] glass-card w-full p-8 md:p-12 rounded-3xl mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#050505]/80 border border-white/10 backdrop-blur-2xl z-30">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 border-b border-white/10 pb-4 tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Day 3: Sunday</h3>
                <table className="w-full text-left text-gray-300">
                    <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">08:30 AM</td><td className="py-5 px-4 text-lg">Arrival</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">09:00 AM</td><td className="py-5 px-4 text-lg">Committee Session V (Voting Block)</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">11:30 AM</td><td className="py-5 px-4 text-lg">Final Plenary Session</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">01:00 PM</td><td className="py-5 px-4 text-lg">Lunch</td></tr>
                        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">02:00 PM</td><td className="py-5 px-4 text-lg">Closing Ceremony & Awards</td></tr>
                        <tr className="hover:bg-white/5 transition-colors"><td className="py-5 px-4 font-semibold text-teal-400 w-1/3 text-lg">04:00 PM</td><td className="py-5 px-4 text-lg">End of Conference</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
