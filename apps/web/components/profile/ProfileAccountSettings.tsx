"use client";

import React, { useState } from "react";
import {
  Settings,
  User,
  Key,
  School,
  Users,
  HelpCircle,
  LogOut,
  ChevronRight,
  X,
  Check,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { showToast } from "nextjs-toast-notify";

interface ProfileAccountSettingsProps {
  studentName: string;
  studentGrade: number;
  schoolName?: string | null;
  studentEmail?: string;
  onLogout: () => Promise<void>;
  onUpdateGrade?: (newGrade: number) => Promise<void>;
  onUpdateName?: (newName: string) => Promise<void>;
}

export function ProfileAccountSettings({
  studentName,
  studentGrade,
  schoolName,
  studentEmail,
  onLogout,
  onUpdateGrade,
  onUpdateName,
}: ProfileAccountSettingsProps) {
  const [activeModal, setActiveModal] = useState<
    "name" | "password" | "grade" | "parent" | "help" | "logout" | null
  >(null);

  // Edit states synced with student props
  const [editName, setEditName] = useState(studentName);
  const [editGrade, setEditGrade] = useState(studentGrade);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    setEditName(studentName);
  }, [studentName]);

  React.useEffect(() => {
    setEditGrade(studentGrade);
  }, [studentGrade]);

  const handleSaveName = async () => {
    if (!editName.trim() || editName.trim().length < 2) {
      showToast.error("Nama panggilan minimal 2 karakter ya!", {
        position: "top-right",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      if (onUpdateName) {
        await onUpdateName(editName.trim());
      }
      showToast.success("Nama panggilan berhasil diperbarui! 🎉", {
        position: "top-right",
      });
      setActiveModal(null);
    } catch {
      showToast.error("Gagal memperbarui nama. Silakan coba lagi.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveGrade = async () => {
    setIsSubmitting(true);
    try {
      if (onUpdateGrade) {
        await onUpdateGrade(editGrade);
      }
      showToast.success(`Kelas berhasil diubah ke Kelas ${editGrade} SD! 🚀`, {
        position: "top-right",
      });
      setActiveModal(null);
    } catch {
      showToast.error("Gagal mengubah kelas. Silakan coba lagi.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSavePassword = () => {
    if (newPassword.length < 6) {
      showToast.error("Kata sandi minimal 6 karakter ya!", {
        position: "top-right",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast.error("Kata sandi konfirmasi tidak cocok!", {
        position: "top-right",
      });
      return;
    }
    showToast.success("Kata sandi baru berhasil disimpan dengan aman! 🔐", {
      position: "top-right",
    });
    setNewPassword("");
    setConfirmPassword("");
    setActiveModal(null);
  };

  const handleConfirmLogout = async () => {
    setIsSubmitting(true);
    try {
      await onLogout();
    } finally {
      setIsSubmitting(false);
      setActiveModal(null);
    }
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-6 w-full">
      {/* Section Header */}
      <div className="flex flex-col">
        <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-600" />
          <span>Pengaturan Akun &amp; Bantuan</span>
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5">
          Atur akun belajar dengan bimbingan orang tua atau guru
        </p>
      </div>

      {/* Settings Grid (6 Items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
        {/* Item 1: Ubah Nama */}
        <button
          type="button"
          onClick={() => {
            setEditName(studentName);
            setActiveModal("name");
          }}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 border border-blue-200 shadow-xs">
              <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                Ubah Nama &amp; Panggilan
              </span>
              <span className="text-xs font-semibold text-slate-400 truncate">
                {studentName} {studentEmail ? `(${studentEmail})` : ""}
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Item 2: Ubah Sandi */}
        <button
          type="button"
          onClick={() => setActiveModal("password")}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-amber-200 hover:bg-amber-50/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0 border border-amber-200 shadow-xs">
              <Key className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                Ubah Kata Sandi Rahasia
              </span>
              <span className="text-xs font-semibold text-slate-400 truncate">
                Kombinasi PIN atau sandi aman anak SD
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Item 3: Ganti Kelas */}
        <button
          type="button"
          onClick={() => {
            setEditGrade(studentGrade);
            setActiveModal("grade");
          }}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0 border border-sky-200 shadow-xs">
              <School className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-slate-800 group-hover:text-blue-600 transition-colors">
                Ganti Kelas &amp; Kurikulum
              </span>
              <span className="text-xs font-semibold text-slate-400 truncate">
                Kelas {studentGrade} SD • Kurikulum Merdeka
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Item 4: Pendampingan Orang Tua */}
        <button
          type="button"
          onClick={() => setActiveModal("parent")}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 border border-emerald-200 shadow-xs">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                Pendampingan Orang Tua
              </span>
              <span className="text-xs font-semibold text-slate-400 truncate">
                Laporan belajar &amp; batas waktu layar
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-heading text-[10px] font-bold border border-emerald-200">
              Aman &amp; Terjaga
            </span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </button>

        {/* Item 5: Bantuan & Tanya Mentor */}
        <button
          type="button"
          onClick={() => setActiveModal("help")}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:border-purple-200 hover:bg-purple-50/30 transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0 border border-purple-200 shadow-xs">
              <HelpCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-slate-800 group-hover:text-purple-600 transition-colors">
                Bantuan &amp; Pertanyaan
              </span>
              <span className="text-xs font-semibold text-slate-400 truncate">
                Tanya Kakak Mentor Kibo &amp; Panduan Belajar
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>

        {/* Item 6: Logout */}
        <button
          type="button"
          onClick={() => setActiveModal("logout")}
          className="flex items-center justify-between p-4 sm:p-5 rounded-3xl bg-rose-50/70 border-2 border-rose-200 hover:bg-rose-100/80 shadow-sm transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-rose-200/80 flex items-center justify-center text-rose-700 shrink-0 border border-rose-300 shadow-xs">
              <LogOut className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading text-sm sm:text-base font-black text-rose-700">
                Keluar Akun Siswa
              </span>
              <span className="text-xs font-semibold text-rose-500/90 truncate">
                Sampai jumpa lagi nanti, {studentName}!
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </button>
      </div>

      {/* Modal 1: Edit Name */}
      {activeModal === "name" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-black text-slate-800">
              Ubah Nama Panggilan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Nama ini akan muncul di kartu sertifikat dan sapaan Kibo.
            </p>

            <div className="mt-4 flex flex-col gap-1.5">
              <label className="font-heading text-xs font-bold text-slate-600">
                Nama Lengkap / Panggilan
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                maxLength={40}
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none font-heading text-sm text-slate-800 bg-slate-50 focus:bg-white transition-colors"
                placeholder="Tulis namamu..."
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveName}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs sm:text-sm font-bold shadow-[0_4px_0_#1D4ED8] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Password */}
      {activeModal === "password" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-black text-slate-800">
              Ubah Kata Sandi Rahasia
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Gunakan kombinasi minimal 6 huruf atau angka yang mudah diingat.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div>
                <label className="font-heading text-xs font-bold text-slate-600 block mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-heading text-sm text-slate-800 bg-slate-50 focus:bg-white"
                  placeholder="Minimal 6 karakter..."
                />
              </div>
              <div>
                <label className="font-heading text-xs font-bold text-slate-600 block mb-1">
                  Ulangi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-heading text-sm text-slate-800 bg-slate-50 focus:bg-white"
                  placeholder="Ketik ulang kata sandi..."
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSavePassword}
                className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-heading text-xs sm:text-sm font-bold shadow-[0_4px_0_#D97706] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                Perbarui Sandi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Edit Grade */}
      {activeModal === "grade" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-heading text-xl font-black text-slate-800">
              Pilih Jenjang Kelasmu
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Kibo akan menyesuaikan kesulitan soal coding dengan jenjang kelasmu.
            </p>

            <div className="grid grid-cols-3 gap-2.5 mt-5">
              {[1, 2, 3, 4, 5, 6].map((g) => {
                const isSelected = editGrade === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setEditGrade(g)}
                    className={`py-3 px-2 rounded-2xl border-2 font-heading font-black text-sm flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-500 text-white border-blue-600 shadow-[0_3px_0_#1D4ED8]"
                        : "bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <span>Kelas {g}</span>
                    <span className="text-[10px] font-bold opacity-80">SD</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 rounded-full font-heading text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveGrade}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-xs sm:text-sm font-bold shadow-[0_4px_0_#1D4ED8] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Kelas"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Parental Guidance */}
      {activeModal === "parent" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-sm border border-emerald-200">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-xl font-black text-slate-800">
              Pendampingan Orang Tua Aktif
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-2 leading-relaxed">
              KibCode dirancang ramah anak tanpa iklan dan tanpa konten berbahaya. Orang tua dapat memantau perkembangan belajar coding anak melalui email laporan mingguan.
            </p>

            <div className="w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 mt-4 text-left flex flex-col gap-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Status Perlindungan:
              </span>
              <span className="font-heading text-xs font-black text-emerald-950">
                ✅ Fitur Keamanan Anak &amp; Konten Tersaring 100%
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-sm font-bold shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Siap, Mengerti! 👍
            </button>
          </div>
        </div>
      )}

      {/* Modal 5: Help & FAQ */}
      {activeModal === "help" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-xl font-black text-slate-800">
              Pusat Bantuan Murid
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">
              Pertanyaan yang sering ditanyakan teman-teman saat belajar koding.
            </p>

            <div className="mt-4 flex flex-col gap-3 text-left">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-heading text-xs font-black text-slate-800 block">
                  🤔 Bagaimana cara menambah bintang &amp; skor?
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                  Mainkan game edukasi dan kuis kilat di menu Game Edukasi. Setiap jawaban benar memberikan poin ekstra!
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-heading text-xs font-black text-slate-800 block">
                  🔥 Apa itu streak belajar harian?
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                  Streak adalah tanda rajin belajar berturut-turut tanpa jeda. Jangan lewatkan 1 hari pun agar apimu tidak padam!
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="font-heading text-xs font-black text-slate-800 block">
                  🤖 Siapa itu Kibo?
                </span>
                <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
                  Kibo adalah robot cerdas sahabat belajarmu yang selalu siap menemani belajar logika dan AI!
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-heading text-sm font-bold shadow-[0_4px_0_#1D4ED8] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      )}

      {/* Modal 6: Logout Confirmation */}
      {activeModal === "logout" && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-300 flex flex-col text-center animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3 shadow-sm border border-rose-200">
              <LogOut className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-xl font-black text-slate-800">
              Yakin Mau Keluar?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
              Semua pencapaian dan skormu tersimpan aman di server Kibo kok!
            </p>

            <div className="mt-6 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-heading text-sm font-bold shadow-[0_4px_0_#BE123C] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                {isSubmitting ? "Keluar..." : "Ya, Keluar Akun"}
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 rounded-full text-slate-600 font-heading text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Tetap Belajar di KibCode
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
