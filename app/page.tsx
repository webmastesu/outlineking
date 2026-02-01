"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Key,
  Globe,
  Download,
  Star,
  Users,
  MessageCircle,
  Phone,
  Send,
  Smartphone,
  ChevronDown,
  CheckCircle,
  Zap,
  Crown,
  AlertTriangle,
  X,
  ExternalLink,
  Loader2,
} from "lucide-react"

const supportContacts = [
  {
    platform: "telegram",
    username: "outlineking",
    url: "https://t.me/outlineking",
    displayName: "Outline King",
    icon: Send,
    color: "bg-blue-500",
  },
  {
    platform: "messenger",
    username: "outlinekingmyanmar",
    url: "https://m.me/outlinekingmyanmar",
    displayName: "Messenger",
    icon: MessageCircle,
    color: "bg-blue-600",
  },
  {
    platform: "viber",
    username: "+959680333118",
    url: "viber://chat?number=+959680333118",
    displayName: "Viber",
    icon: Phone,
    color: "bg-purple-500",
  },
  {
    platform: "line",
    username: "outlineking",
    url: "https://line.me/ti/p/outlineking",
    displayName: "Line",
    icon: MessageCircle,
    color: "bg-green-500",
  },
  {
    platform: "sms",
    username: "+959680333118",
    url: "sms:+959680333118",
    displayName: "SMS",
    icon: Smartphone,
    color: "bg-gray-600",
  },
]

const features = [
  {
    icon: Key,
    title: "Access Key စီမံခန့်ခွဲမှု",
    description: "သင့် Outline Server ရှိ Access Key များအားလုံးကို တစ်နေရာတည်းမှ အလွယ်တကူ စီမံခန့်ခွဲပါ။",
  },
  {
    icon: Users,
    title: "User Management",
    description: "User များ၏ Access Permission များကို ထိန်းချုပ်ပြီး Team အလုပ်များကို ပိုမိုကောင်းမွန်စွာ စီမံပါ။",
  },
  {
    icon: Globe,
    title: "Multi-Server Support",
    description: "Multiple Outline Server များကို တစ်ပြိုင်နက် စီမံခန့်ခွဲနိုင်သော စွမ်းရည်။",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description: "မိုဘိုင်းလ်ဖုန်းမှ အလွယ်တကူ အသုံးပြုနိုင်သော User Interface ဒီဇိုင်း။",
  },
  {
    icon: Crown,
    title: "Professional Tools",
    description: "Server Owner များအတွက် အထူးဒီဇိုင်းပြုလုပ်ထားသော Professional Management Tools။",
  },
  {
    icon: Zap,
    title: "လွယ်ကူသော အသုံးပြုမှု",
    description: "ရှုပ်ထွေးမှုမရှိ၊ အလွယ်တကူ အသုံးပြုနိုင်သော Interface ဒီဇိုင်း။",
  },
]

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDialog, setShowDialog] = useState(true)
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [showVirusDialog, setShowVirusDialog] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<"upload" | "scan" | "complete">("upload")
  const [showFloatingContact, setShowFloatingContact] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Hide/Show header based on scroll direction
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        // Scrolling down
        setHeaderVisible(false)
      } else {
        // Scrolling up
        setHeaderVisible(true)
      }

      setPrevScrollY(currentScrollY)

      // Show floating contact after scrolling past hero section
      setShowFloatingContact(currentScrollY > 800)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollY])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDownload = () => {
    setShowDownloadDialog(true)
  }

  const startVirusScan = () => {
    setShowDownloadDialog(false)
    setShowVirusDialog(true)
    setIsUploading(true)
    setIsScanning(false)
    setScanComplete(false)
    setUploadProgress(0)
    setScanProgress(0)
    setCurrentPhase("upload")

    // Phase 1: Upload simulation (10 seconds)
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval)
          setIsUploading(false)
          setCurrentPhase("scan")

          // Start Phase 2: Scanning (25 seconds)
          setTimeout(() => {
            setIsScanning(true)
            const scanInterval = setInterval(() => {
              setScanProgress((prev) => {
                if (prev >= 100) {
                  clearInterval(scanInterval)
                  setIsScanning(false)
                  setScanComplete(true)
                  setCurrentPhase("complete")
                  return 100
                }
                return prev + 4 // 25 seconds total (100/4 = 25)
              })
            }, 1000)
          }, 500)

          return 100
        }
        return prev + 10 // 10 seconds total
      })
    }, 1000)
  }

  const confirmDownload = () => {
    window.open("http://192.168.1.1", "_blank")
    setShowDownloadDialog(false)
    setShowVirusDialog(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-800 text-white overflow-hidden">
      {/* Warning Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-900 border border-emerald-700 rounded-lg p-6 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex items-start space-x-4 text-container">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 myanmar-heading">သတိပြုရန်</h3>
                <p className="text-emerald-100 text-sm leading-relaxed mb-4 font-noto myanmar-text">
                  ယခု ဆော့ဝဲသည် Access Key အသုံးပြုသူများ အသုံးပြုရန် မဟုတ်ပါ။ စီမံခန့်ခွဲသော သာမန်စာရင်းပြုစုသော App ဖြစ်ပါသည်။ တားမြစ်ပိတ်ပင်ထားသည့်
                  မည်သည့် Network ကိုမှ ကျော်လွန်သုံးဆွဲနိုင်ခြင်းမရှိပါ။
                </p>
              </div>
              <button
                onClick={() => setShowDialog(false)}
                className="flex-shrink-0 text-emerald-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setShowDialog(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-noto"
              >
                နားလည်ပါပြီ
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Download Confirmation Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-900 border border-emerald-700 rounded-lg p-6 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex items-start space-x-4 text-container">
              <div className="flex-shrink-0">
                <Download className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 myanmar-heading">Download အတည်ပြုချက်</h3>
                <p className="text-emerald-100 text-sm leading-relaxed mb-4 font-noto myanmar-text">
                  Android ဖုန်းများတွင်သာ အလုပ်လုပ်ပါသည်။ ယခုဆော့ဝဲသည် Playstore ပြင်ပမှ ထည့်သွင်းမှာဖြစ်သောကြောင့် Playstore အသိမှတ်ပြု Virus
                  ကင်းရှင်းကြောင်းထောက်ခံချက်လိုပါသည် အသုံးပြုသူသည် မိမိ ဖုန်းထဲသို့မထည့်မီ Virus ကင်းရှင်းကြောင်း စစ်ဆေးထားသော အဖြေကိုကြည့်ရှုပြီးမှသာ မိမိ
                  သဘောအတိုင်းထည့်သွင်းနိုင်ပါသည်
                </p>
                <button
                  onClick={startVirusScan}
                  className="inline-flex items-center text-emerald-300 hover:text-emerald-200 text-sm mb-4 underline"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Virus စစ်ဆေးကြည့်ရန်
                </button>
              </div>
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="flex-shrink-0 text-emerald-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <Button
                onClick={() => setShowDownloadDialog(false)}
                variant="outline"
                className="border-emerald-600 text-emerald-200 hover:bg-emerald-800 px-4 py-2 font-noto"
              >
                မလုပ်တော့ပါ
              </Button>
              <Button
                onClick={confirmDownload}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 font-noto"
              >
                Download လုပ်မည်
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Virus Scan Dialog */}
      {showVirusDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-900 border border-emerald-700 rounded-lg p-6 max-w-md mx-4 shadow-2xl"
          >
            <div className="flex items-start space-x-4 text-container">
              <div className="flex-shrink-0">
                {isUploading || isScanning ? (
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                ) : (
                  <Shield className="w-8 h-8 text-emerald-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-3 myanmar-heading">
                  {currentPhase === "upload" && "File Upload လုပ်နေသည်..."}
                  {currentPhase === "scan" && "Virus စစ်ဆေးနေသည်..."}
                  {currentPhase === "complete" && "Virus စစ်ဆေးမှု အစီရင်ခံစာ"}
                </h3>

                {/* Upload Phase */}
                {currentPhase === "upload" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-emerald-200 mb-2">
                      <span>VirusTotal သို့ Upload လုပ်နေသည်...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-emerald-950 rounded-full h-2">
                      <motion.div
                        className="bg-blue-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-emerald-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>Outline-king-v2.apk (12.8 MB) uploading...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Scanning Phase */}
                {currentPhase === "scan" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-emerald-200 mb-2">
                      <span>70+ Antivirus Engines ဖြင့် စစ်ဆေးနေသည်...</span>
                      <span>{scanProgress}%</span>
                    </div>
                    <div className="w-full bg-emerald-950 rounded-full h-2">
                      <motion.div
                        className="bg-emerald-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${scanProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-emerald-300">
                      {scanProgress < 20 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                          <span>Kaspersky, Norton စစ်ဆေးနေသည်...</span>
                        </div>
                      )}
                      {scanProgress >= 20 && scanProgress < 40 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                          <span>McAfee, Avast စစ်ဆေးနေသည်...</span>
                        </div>
                      )}
                      {scanProgress >= 40 && scanProgress < 60 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                          <span>Bitdefender, ESET စစ်ဆေးနေသည်...</span>
                        </div>
                      )}
                      {scanProgress >= 60 && scanProgress < 80 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <span>Malware signature စစ်ဆေးနေသည်...</span>
                        </div>
                      )}
                      {scanProgress >= 80 && scanProgress < 100 && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Final verification လုပ်နေသည်...</span>
                        </div>
                      )}
                      {scanProgress === 100 && (
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>စစ်ဆေးမှု ပြီးစီးပါပြီ!</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Results Phase */}
                {scanComplete && (
                  <div className="bg-emerald-950/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-semibold">Clean - No threats detected</span>
                    </div>
                    <p className="text-emerald-100 text-sm mb-3 font-noto myanmar-text">
                      VirusTotal မှ 70+ Antivirus engines များဖြင့် စစ်ဆေးပြီး Virus မတွေ့ရှိပါ။
                    </p>

                    {/* Real-time scan results simulation */}
                    <div className="space-y-2 text-sm text-emerald-200 mb-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs">Kaspersky: Clean</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs">Norton: Clean</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs">McAfee: Clean</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs">Avast: Clean</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-emerald-200">
                      <div className="flex justify-between">
                        <span>File Name:</span>
                        <span>Outline-king-v2.apk</span>
                      </div>
                      <div className="flex justify-between">
                        <span>File Size:</span>
                        <span>12.8 MB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Detection:</span>
                        <span className="text-green-400">0/70 Clean</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Scan Time:</span>
                        <span>{new Date().toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://www.virustotal.com/gui/file/128ca3d5b630a7ac39ab78d873e89ab4b5750c0df6c3bd75cac42571a10d5097?nocache=1",
                          "_blank",
                        )
                      }
                      variant="outline"
                      className="w-full border-emerald-600 text-emerald-200 hover:bg-emerald-800 mt-4 font-noto"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      VirusTotal မှာ အပြည့်အစုံကြည့်ရန်
                    </Button>
                  </div>
                )}
              </div>
              {!isUploading && !isScanning && (
                <button
                  onClick={() => {
                    setShowVirusDialog(false)
                    setScanComplete(false)
                    setUploadProgress(0)
                    setScanProgress(0)
                    setCurrentPhase("upload")
                  }}
                  className="flex-shrink-0 text-emerald-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {scanComplete && (
              <div className="flex justify-between items-center mt-4">
                <Button
                  onClick={() => {
                    setShowVirusDialog(false)
                    setShowDownloadDialog(true)
                    setScanComplete(false)
                    setUploadProgress(0)
                    setScanProgress(0)
                    setCurrentPhase("upload")
                  }}
                  variant="outline"
                  className="border-emerald-600 text-emerald-200 hover:bg-emerald-800 px-4 py-2 font-noto"
                >
                  ← ပြန်သွားမည်
                </Button>
                <Button
                  onClick={confirmDownload}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 font-noto"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download လုပ်မည်
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Floating Contact Button */}
      {showFloatingContact && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={() => scrollToSection("contact")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        </motion.div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/80 backdrop-blur-md border-b border-emerald-800/50"
        initial={{ y: -100 }}
        animate={{ y: headerVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
            <img src="/icon-192.png" alt="Outline King" className="w-10 h-10" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-noto">
              Outline King
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-emerald-300 transition-colors font-noto"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-emerald-300 transition-colors font-noto"
            >
              Contact
            </button>
            <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 font-noto">
              Download
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center text-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-block mb-6">
              <img src="/icon-512.png" alt="Outline King Logo" className="w-32 h-32 mx-auto drop-shadow-2xl" />
            </div>

            <Badge className="mb-6 bg-emerald-600/20 text-emerald-200 border-emerald-500/30 px-4 py-2 font-noto">
              <Crown className="w-4 h-4 mr-2" />
              Premium Access Key Manager
            </Badge>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent font-noto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Outline King
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed font-noto myanmar-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Access Key များကို အလွယ်တကူ စီမံခန့်ခွဲနိုင်သော Professional Management Tool
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-105 font-noto"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-400 text-emerald-200 hover:bg-emerald-600 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-transparent font-noto"
              onClick={() => scrollToSection("features")}
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="flex justify-center items-center space-x-8 text-emerald-200 font-noto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">Premium Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold">Key Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold">Server Owners</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          onClick={() => scrollToSection("features")}
        >
          <ChevronDown className="w-8 h-8 text-emerald-300" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative">
        <motion.div style={{ y: y1 }} className="container mx-auto px-6 text-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-noto myanmar-heading">
              အဓိက လုပ်ဆောင်ချက်များ
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-noto myanmar-text">
              Server Owner များအတွက် လိုအပ်သော Management Tools များ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-emerald-900/30 border-emerald-700/50 backdrop-blur-sm hover:bg-emerald-800/40 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-container">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-emerald-600/20 rounded-lg mr-4">
                        <feature.icon className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white font-noto">{feature.title}</h3>
                    </div>
                    <p className="text-emerald-100 leading-relaxed font-noto myanmar-text">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 relative">
        <motion.div style={{ y: y2 }} className="container mx-auto px-6 text-center text-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-noto myanmar-heading">
              ယခုပင် စတင်အသုံးပြုပါ
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-8 font-noto myanmar-text">
              Outline King ကို Download လုပ်ပြီး သင့် Server များကို Professional စွာ စီမံခန့်ခွဲပါ။
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 font-noto"
                onClick={handleDownload}
              >
                <Download className="w-6 h-6 mr-3" />
                Download for Android
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-400 text-emerald-200 hover:bg-emerald-600 px-12 py-6 text-xl font-semibold transition-all duration-300 bg-transparent font-noto"
                disabled
              >
                <Download className="w-6 h-6 mr-3" />
                iOS (Coming Soon)
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto font-noto">
            {[
              { icon: CheckCircle, text: "Free to Download" },
              { icon: Shield, text: "Virus Scanned" },
              { icon: Zap, text: "Lightning Fast Setup" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center space-x-3 text-emerald-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <item.icon className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6 text-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-noto myanmar-heading">
              အကူအညီရယူပါ
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto font-noto myanmar-text">
              အကူအညီလိုအပ်ပါသလား? ကျွန်ုပ်တို့၏ Support Team သည် ၂၄/၇ အချိန်ပြည့် ဝန်ဆောင်မှုပေးပါသည်
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {supportContacts.map((contact, index) => (
              <motion.a
                key={index}
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-emerald-900/30 border-emerald-700/50 backdrop-blur-sm hover:bg-emerald-800/40 transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-4 rounded-full ${contact.color} mb-4`}>
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 font-noto">{contact.displayName}</h3>
                    <p className="text-emerald-200 text-sm font-noto">{contact.username}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-emerald-800/50 bg-emerald-950/50 text-container">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img src="/icon-192.png" alt="Outline King" className="w-8 h-8" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent font-noto">
              Outline King
            </span>
          </div>
          <p className="text-emerald-200 mb-4 font-noto myanmar-text">
            Server Owner များအတွက် Professional Management Solution
          </p>
          <p className="text-emerald-300 text-sm font-noto">© 2024 Outline King. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
