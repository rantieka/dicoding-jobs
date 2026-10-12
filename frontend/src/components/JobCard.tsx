import Link from "next/link";
import Image from "next/image";
import { Building2, MapPin, Briefcase } from "lucide-react";
import { Vacancy } from "@/types/vacancy";

interface JobCardProps {
  vacancy: Vacancy;
}

export default function JobCard({ vacancy }: JobCardProps) {
  return (
    <Link
      href={`/vacancies/${vacancy.id}`}
      id={`job-card-${vacancy.id}`}
      className="group block bg-white border border-gray-200 hover:border-gray-400 rounded-xl p-5 sm:p-6 transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        {/* Left Side: Logo & Main Job Info */}
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Company Logo Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 shadow-xs relative">
            <Image
              src="/dicoding-logo.png"
              alt={vacancy.company_name || "Dicoding Indonesia"}
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#2D74FF] transition-colors leading-snug">
              {vacancy.title}
            </h3>

            {/* Company & Job Type */}
            <div className="flex items-center gap-4 text-xs sm:text-sm mt-1.5">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4" />
                <span>{vacancy.company_name || "Dicoding Indonesia"}</span>
              </div>
              <span className="capitalize">{vacancy.job_type || "Full-time"}</span>
            </div>

            {/* Location & Experience */}
            <div className="flex items-center gap-4 text-xs sm:text-sm mt-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{vacancy.location}</span>
                {vacancy.is_remote && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                    Remote
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span>{vacancy.min_experience}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dates */}
        <div className="sm:text-right text-xs sm:text-sm text-gray-500 flex flex-col gap-1 self-start sm:self-start pt-0.5 sm:pt-0.5 shrink-0">
          <p>
            Dibuat pada{" "}
            <span>
              {vacancy.formatted_created_at || "15 Desember 2023"}
            </span>
          </p>
          <p>
            Lamar sebelum{" "}
            <span>
              {vacancy.formatted_active_until || "30 Desember 2023"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}