import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Trash2, Plus, Sparkles, Info, Settings } from "lucide-react"
import { AppDetails } from "@/types/app"

interface AppFormBasicProps {
  appData: AppDetails
  handleInputChange: (field: string, value: any) => void
  handleArrayAdd: (field: string, value: string) => void
  handleArrayRemove: (field: string, index: number) => void
}

export const AppFormBasic: React.FC<AppFormBasicProps> = ({
  appData,
  handleInputChange,
  handleArrayAdd,
  handleArrayRemove,
}) => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Info className="h-5 w-5 text-emerald-400" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="id" className="text-gray-300 font-medium">
                App ID <span className="text-emerald-400">*</span>
              </Label>
              <Input
                id="id"
                value={appData.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
                placeholder="Enter unique app ID"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300 font-medium">
                App Name <span className="text-emerald-400">*</span>
              </Label>
              <Input
                id="name"
                value={appData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter app name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription" className="text-gray-300 font-medium">
              Short Description
            </Label>
            <Input
              id="shortDescription"
              value={appData.shortDescription}
              onChange={(e) =>
                handleInputChange("shortDescription", e.target.value)
              }
              placeholder="Brief description for app cards"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300 font-medium">
              Full Description
            </Label>
            <Textarea
              id="description"
              value={appData.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              placeholder="Detailed app description"
              rows={6}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-gray-300 font-medium">
                Icon URL
              </Label>
              <Input
                id="icon"
                value={appData.icon}
                onChange={(e) => handleInputChange("icon", e.target.value)}
                placeholder="https://example.com/icon.png"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demoLink" className="text-gray-300 font-medium">
                Demo Link
              </Label>
              <Input
                id="demoLink"
                value={appData.demoLink || ""}
                onChange={(e) => handleInputChange("demoLink", e.target.value)}
                placeholder="https://demo.example.com"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 pt-4">
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <Switch
                id="isPrivate"
                checked={appData.isPrivate ?? false}
                onCheckedChange={(checked) =>
                  handleInputChange("isPrivate", checked)
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="isPrivate" className="text-gray-300 cursor-pointer">
                Private App
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <Switch
                id="hasInAppPurchases"
                checked={appData.hasInAppPurchases}
                onCheckedChange={(checked) =>
                  handleInputChange("hasInAppPurchases", checked)
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="hasInAppPurchases" className="text-gray-300 cursor-pointer">
                In-App Purchases
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card Details */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            Card Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cardImage" className="text-gray-300 font-medium">
                Card Image URL
              </Label>
              <Input
                id="cardImage"
                value={appData.cardDetails.image}
                onChange={(e) =>
                  handleInputChange("cardDetails.image", e.target.value)
                }
                placeholder="https://example.com/card.png"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardType" className="text-gray-300 font-medium">
                Card Type
              </Label>
              <Select
                value={appData.cardDetails.type}
                onValueChange={(value) =>
                  handleInputChange("cardDetails.type", value)
                }
              >
                <SelectTrigger 
                  id="cardType"
                  className="bg-gray-800 border-gray-700 text-white focus:border-emerald-400 focus:ring-emerald-400/20"
                >
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="development" className="text-gray-300 focus:bg-emerald-500/20 focus:text-white">
                    Development
                  </SelectItem>
                  <SelectItem value="design" className="text-gray-300 focus:bg-emerald-500/20 focus:text-white">
                    Design
                  </SelectItem>
                  <SelectItem value="development + design" className="text-gray-300 focus:bg-emerald-500/20 focus:text-white">
                    Development + Design
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardTitle" className="text-gray-300 font-medium">
              Card Title
            </Label>
            <Input
              id="cardTitle"
              value={appData.cardDetails.title}
              onChange={(e) =>
                handleInputChange("cardDetails.title", e.target.value)
              }
              placeholder="Title for app card"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardDescription" className="text-gray-300 font-medium">
              Card Description
            </Label>
            <Textarea
              id="cardDescription"
              value={appData.cardDetails.description}
              onChange={(e) =>
                handleInputChange("cardDetails.description", e.target.value)
              }
              placeholder="Description for app card"
              rows={3}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors resize-none"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-gray-300 font-medium">
              Card Technologies
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {appData.cardDetails.tech.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 transition-colors flex items-center gap-1.5 px-3 py-1"
                >
                  <span className="font-mono text-sm">{tech}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    onClick={() =>
                      handleArrayRemove("cardDetails.tech", index)
                    }
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="newCardTech"
                placeholder="Add technology (press Enter)"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-400 focus:ring-emerald-400/20 transition-colors"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    const value = (e.target as HTMLInputElement).value.trim()
                    if (value) {
                      handleArrayAdd("cardDetails.tech", value)
                      ;(e.target as HTMLInputElement).value = ""
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-400 transition-colors"
                onClick={() => {
                  const input = document.getElementById(
                    "newCardTech"
                  ) as HTMLInputElement
                  const value = input.value.trim()
                  if (value) {
                    handleArrayAdd("cardDetails.tech", value)
                    input.value = ""
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Button Configuration */}
      <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-emerald-400" />
            Button Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <Switch
                id="wishlistBtn"
                checked={appData.buttons.wishlist}
                onCheckedChange={(checked) =>
                  handleInputChange("buttons.wishlist", checked)
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="wishlistBtn" className="text-gray-300 cursor-pointer">
                Wishlist Button
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <Switch
                id="shareBtn"
                checked={appData.buttons.share}
                onCheckedChange={(checked) =>
                  handleInputChange("buttons.share", checked)
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="shareBtn" className="text-gray-300 cursor-pointer">
                Share Button
              </Label>
            </div>
            <div className="flex items-center space-x-3 bg-gray-800/50 px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
              <Switch
                id="demoBtn"
                checked={appData.buttons.demo}
                onCheckedChange={(checked) =>
                  handleInputChange("buttons.demo", checked)
                }
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="demoBtn" className="text-gray-300 cursor-pointer">
                Demo Button
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}