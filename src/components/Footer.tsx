import { Link } from "react-router-dom";
import { Heart, BookOpen, Mail, Github, Twitter, MessageCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 bg-gradient-to-b from-background via-muted/5 to-muted/10 mt-auto">
      {/* Decorative top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                BookHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your gateway to knowledge. Explore comprehensive documentation and connect with our vibrant community.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                asChild
              >
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2.5">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Home
              </Link>
              <Link
                to="/details"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Documentation
              </Link>
              <Link
                to="/auth"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
              Resources
            </h3>
            <nav className="flex flex-col gap-2.5">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                API Documentation
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Community Forum
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit hover:translate-x-0.5 transform duration-200"
              >
                Release Notes
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-sm text-foreground uppercase tracking-wide">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:hello@bookhub.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>hello@bookhub.com</span>
              </a>
              <p className="text-sm text-muted-foreground">
                Have questions? We're here to help and would love to hear from you.
              </p>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-border/40" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-accent fill-accent animate-pulse" /> by BookHub Team
            <span className="mx-1">•</span>
            <span>© {currentYear} All rights reserved</span>
          </p>
          
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
    </footer>
  );
};

export default Footer;
