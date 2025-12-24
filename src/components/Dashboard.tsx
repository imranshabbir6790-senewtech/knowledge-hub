import { FileText, Youtube, MessageCircle, ExternalLink, Download, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/i18n/LanguageContext";

interface DashboardConfig {
  showPdf: boolean;
  pdfUrl?: string;
  showVideo: boolean;
  videoId?: string;
  showCommunityLinks: boolean;
  discordUrl?: string;
  redditUrl?: string;
}

interface DashboardProps {
  config: DashboardConfig;
}

const Dashboard = ({ config }: DashboardProps) => {
  const { showPdf, pdfUrl, showVideo, videoId, showCommunityLinks, discordUrl, redditUrl } = config;
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Resources & Community
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Access documentation, watch featured content, and connect with our community.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* PDF Card */}
          {showPdf && (
            <Card className="group border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-lg bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="font-display text-lg">Documentation</CardTitle>
                <CardDescription className="text-xs">
                  View and download comprehensive documentation
                </CardDescription>
                <p className="text-[10px] text-muted-foreground/60 mt-1">PDF content — Language configurable</p>
              </CardHeader>
              <CardContent className="flex gap-2 pt-2">
                <Link to="/details" className="flex-1">
                  <Button variant="outline" className="w-full gap-1.5 text-xs h-9">
                    <ExternalLink className="h-3.5 w-3.5" />
                    View
                  </Button>
                </Link>
                {pdfUrl && (
                  <a href={pdfUrl} download className="flex-1">
                    <Button variant="secondary" className="w-full gap-1.5 text-xs h-9">
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* Video Card */}
          {showVideo && videoId && (
            <Card className="group border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200 md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-lg bg-destructive/10 flex items-center justify-center mb-3 group-hover:bg-destructive/15 transition-colors">
                  <Youtube className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle className="font-display text-lg">Featured Video</CardTitle>
                <CardDescription className="text-xs">
                  Watch our latest featured content
                </CardDescription>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Video embed — Toggle visibility on/off</p>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/30">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Featured video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Community Card */}
          {showCommunityLinks && (
            <Card className="group border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                  <MessageCircle className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="font-display text-lg">Join Community</CardTitle>
                <CardDescription className="text-xs">
                  Connect with readers and get support
                </CardDescription>
                <p className="text-[10px] text-muted-foreground/60 mt-1">Community links — Configurable</p>
              </CardHeader>
              <CardContent className="space-y-2 pt-2">
                {discordUrl && (
                  <a href={discordUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2.5 h-9 text-xs">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                      {t("joinDiscord")}
                    </Button>
                  </a>
                )}
                {redditUrl && (
                  <a href={redditUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2.5 h-9 text-xs">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                      </svg>
                      {t("joinReddit")}
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          )}

          {/* Details Link Card */}
          <Card className="group border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                <ExternalLink className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="font-display text-lg">Learn More</CardTitle>
              <CardDescription className="text-xs">
                Visit details page for comprehensive info
              </CardDescription>
              <p className="text-[10px] text-muted-foreground/60 mt-1">Navigation — View details page</p>
            </CardHeader>
            <CardContent className="pt-2">
              <Link to="/details">
                <Button variant="default" className="w-full gap-1.5 h-9 text-xs">
                  <Play className="h-3.5 w-3.5" />
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
