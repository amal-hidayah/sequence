import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#f5f5f0] text-black py-20 px-8 relative z-10 border-t-2 border-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                    <Image src="/logo/logo.png" alt="Kopi Kenangan" width={400} height={130} className="object-contain" unoptimized />
                </div>
                <div className="flex gap-10 mt-10 md:mt-0 text-sm uppercase tracking-widest text-gray-700">
                    <a href="#" className="hover:text-[#C72229] transition-colors font-semibold">Instagram</a>
                    <a href="#" className="hover:text-[#C72229] transition-colors font-semibold">Twitter</a>
                    <a href="#" className="hover:text-[#C72229] transition-colors font-semibold">LinkedIn</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 flex justify-between text-xs text-gray-600 uppercase font-medium">
                <span>© 2026 Kopi Kenangan</span>
                <span>Designed by KARDIGI</span>
            </div>
        </footer>
    )
}
