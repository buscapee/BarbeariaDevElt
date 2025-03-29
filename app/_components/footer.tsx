import { InstagramIcon, FacebookIcon, LinkedinIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="border-t border-solid border-secondary">
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Logo e Copyright */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Image 
              src="/logo.png" 
              alt="FSW Barber" 
              width={120} 
              height={18}
              className="h-auto w-auto"
            />
            <p className="text-sm text-gray-400">
              © 2025 DevElt. Todos os direitos reservados.
            </p>
          </div>

          {/* Links Úteis */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link 
              href="/privacy" 
              className="text-sm text-gray-400 transition-colors hover:text-primary"
            >
              Política de Privacidade
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-gray-400 transition-colors hover:text-primary"
            >
              Termos de Uso
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-gray-400 transition-colors hover:text-primary"
            >
              Sobre Nós
            </Link>
          </div>

          {/* Redes Sociais */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://instagram.com" 
              target="_blank"
              className="text-gray-400 transition-colors hover:text-primary"
            >
              <InstagramIcon size={20} />
            </Link>
            <Link 
              href="https://facebook.com" 
              target="_blank"
              className="text-gray-400 transition-colors hover:text-primary"
            >
              <FacebookIcon size={20} />
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank"
              className="text-gray-400 transition-colors hover:text-primary"
            >
              <LinkedinIcon size={20} />
            </Link>
          </div>
        </div>

        {/* Desenvolvido por */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            Desenvolvido por{" "}
            <Link 
              href="https://develt.com" 
              target="_blank"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              DevElt
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
