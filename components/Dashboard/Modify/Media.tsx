import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Image, Film, Camera, ImageIcon } from "lucide-react"
import { AppDetails } from "@/types/app"

interface MediaAssetsSectionProps {
  appData: AppDetails
  handleInputChange: (field: string, value: string) => void
  handleArrayAdd: (field: string, value: string) => void
  handleArrayRemove: (field: string, index: number) => void
  handleArrayUpdate: (field: string, index: number, value: string) => void
}

export const MediaAssetsSection: React.FC<MediaAssetsSectionProps> = ({
  appData,
  handleInputChange,
  handleArrayAdd,
  handleArrayRemove,
  handleArrayUpdate,
}) => {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <Image className="h-5 w-5 text-emerald-400" />
          Media Assets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="headerImage" className="text-gray-300 font-medium flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-gray-400" />
            Header Image URL
          </Label>
          <Input
            id="headerImage"
            value={appData.headerImage}
            onChange={(e) =>
              handleInputChange("headerImage", e.target.value)
            }
            placeholder="https://example.com/header.png"
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
          />
          {appData.headerImage && (
            <div className="mt-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700">
              <img 
                src={appData.headerImage} 
                alt="Header preview" 
                className="w-full h-24 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="trailerUrl" className="text-gray-300 font-medium flex items-center gap-2">
            <Film className="h-4 w-4 text-gray-400" />
            Trailer URL
          </Label>
          <Input
            id="trailerUrl"
            value={appData.trailerUrl || ""}
            onChange={(e) =>
              handleInputChange("trailerUrl", e.target.value)
            }
            placeholder="https://youtube.com/watch?v=..."
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
          />
          <p className="text-sm text-gray-500">
            Supports YouTube, Vimeo, or direct video URLs
          </p>
        </div>

        <div className="space-y-3">
          <Label className="text-gray-300 font-medium flex items-center gap-2">
            <Camera className="h-4 w-4 text-gray-400" />
            Screenshots
            <span className="text-sm text-gray-500 font-normal">
              ({appData.screenshots.length} added)
            </span>
          </Label>
          
          <div className="space-y-3">
            {appData.screenshots.map((screenshot, index) => (
              <div 
                key={index} 
                className="group relative bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
              >
                <div className="flex gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 font-mono">
                        #{index + 1}
                      </span>
                      <Input
                        value={screenshot}
                        onChange={(e) =>
                          handleArrayUpdate("screenshots", index, e.target.value)
                        }
                        placeholder="https://example.com/screenshot.png"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-400 transition-colors"
                        onClick={() => handleArrayRemove("screenshots", index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {screenshot && (
                      <div className="ml-8">
                        <img 
                          src={screenshot} 
                          alt={`Screenshot ${index + 1}`} 
                          className="h-20 w-auto rounded-md border border-gray-700 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {appData.screenshots.length === 0 && (
              <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700 border-dashed">
                <Camera className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No screenshots added yet</p>
                <p className="text-gray-600 text-xs mt-1">Add screenshots to showcase your app</p>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-all duration-200 group"
              onClick={() => handleArrayAdd("screenshots", "")}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Add Screenshot
            </Button>
          </div>
          
          <div className="mt-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-xs text-gray-500">
              <span className="text-emerald-400">Tip:</span> Add multiple screenshots to showcase different features of your app. 
              Recommended dimensions: 1920x1080 or 16:9 aspect ratio.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}