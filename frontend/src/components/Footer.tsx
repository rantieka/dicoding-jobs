import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-start space-y-4">
          {/* Dicoding Wordmark Logo */}
          <div className="relative">
            <Image
              src="/dicoding-wordmark.png"
              alt="Dicoding"
              width={138}
              height={34}
              className="h-7 w-auto object-contain"
            />
          </div>

          <div className="text-sm text-gray-500 leading-relaxed font-normal max-w-sm">
            <p>Dicoding Space</p>
            <p>
              Jl. Batik Kumeli No.50, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung Jawa Barat 40123
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}