import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Trash2, Plus, Code2, Shield, Calendar, Package, Users, Layers } from "lucide-react"
import { AppDetails } from "@/types/app"

interface TechnicalDetailsSectionProps {
  appData: AppDetails
  categoryOptions: string[]
  handleInputChange: (field: string, value: any) => void
  handleArrayAdd: (field: string, value: string) => void
  handleArrayRemove: (field: string, index: number) => void
}

export const TechnicalDetailsSection: React.FC<TechnicalDetailsSectionProps> = ({
  appData,
  categoryOptions,
  handleInputChange,
  handleArrayAdd,
  handleArrayRemove,
}) => {
  return (
    <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-emerald-500/50 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="text-white font-bold text-xl flex items-center gap-2">
          <Layers className="h-5 w-5 text-emerald-400" />
          Technical Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Tech Stack */}
        <div className="space-y-3">
          <Label className="text-gray-300 font-medium flex items-center gap-2 text-sm">
            <Code2 className="h-4 w-4 text-emerald-400" />
            Tech Stack
          </Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {appData.techStack.map((tech, index) => (
              <Badge 
                key={index} 
                className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30 hover:border-emerald-400 transition-all duration-200 flex items-center gap-1.5 px-3 py-1"
              >
                <span className="font-mono text-sm">{tech}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent hover:text-red-400 transition-colors"
                  onClick={() => handleArrayRemove("techStack", index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id="newTech"
              placeholder="Add technology"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const value = (e.target as HTMLInputElement).value.trim()
                  if (value) {
                    handleArrayAdd("techStack", value)
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }
              }}
            />
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
              onClick={() => {
                const input = document.getElementById("newTech") as HTMLInputElement
                const value = input.value.trim()
                if (value) {
                  handleArrayAdd("techStack", value)
                  input.value = ""
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-3">
          <Label className="text-gray-300 font-medium flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-emerald-400" />
            Permissions
          </Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {appData.permissions.map((permission, index) => (
              <Badge 
                key={index} 
                className="bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600 hover:bg-gray-700 transition-all duration-200 flex items-center gap-1.5 px-3 py-1"
              >
                <span className="text-sm">{permission}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent hover:text-red-400 transition-colors"
                  onClick={() => handleArrayRemove("permissions", index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              id="newPermission"
              placeholder="Add permission"
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  const value = (e.target as HTMLInputElement).value.trim()
                  if (value) {
                    handleArrayAdd("permissions", value)
                    ;(e.target as HTMLInputElement).value = ""
                  }
                }
              }}
            />
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg hover:shadow-emerald-500/25 transition-all duration-200"
              onClick={() => {
                const input = document.getElementById("newPermission") as HTMLInputElement
                const value = input.value.trim()
                if (value) {
                  handleArrayAdd("permissions", value)
                  input.value = ""
                }
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Additional Info */}
        <div className="space-y-4">
          <h3 className="text-gray-300 font-medium text-sm flex items-center gap-2">
            <Package className="h-4 w-4 text-emerald-400" />
            App Information
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-400 text-sm">Category</Label>
              <Select
                value={appData.additionalInfo.category}
                onValueChange={(value) =>
                  handleInputChange("additionalInfo.category", value)
                }
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white hover:border-emerald-500 focus:border-emerald-500 transition-all duration-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categoryOptions.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white focus:bg-emerald-500/20 focus:text-emerald-400"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size" className="text-gray-400 text-sm">App Size</Label>
              <Input
                id="size"
                value={appData.additionalInfo.size}
                onChange={(e) =>
                  handleInputChange("additionalInfo.size", e.target.value)
                }
                placeholder="e.g., 125 MB"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version" className="text-gray-400 text-sm">Version</Label>
              <Input
                id="version"
                value={appData.additionalInfo.version}
                onChange={(e) =>
                  handleInputChange("additionalInfo.version", e.target.value)
                }
                placeholder="e.g., 1.0.0"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200 font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="developer" className="text-gray-400 text-sm flex items-center gap-1">
                <Users className="h-3 w-3" />
                Developer
              </Label>
              <Input
                id="developer"
                value={appData.additionalInfo.developer}
                onChange={(e) =>
                  handleInputChange("additionalInfo.developer", e.target.value)
                }
                placeholder="Developer name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher" className="text-gray-400 text-sm">Publisher</Label>
              <Input
                id="publisher"
                value={appData.additionalInfo.publisher}
                onChange={(e) =>
                  handleInputChange("additionalInfo.publisher", e.target.value)
                }
                placeholder="Publisher name"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate" className="text-gray-400 text-sm flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Release Date
            </Label>
            <Input
              id="releaseDate"
              type="date"
              value={appData.additionalInfo.releaseDate}
              onChange={(e) =>
                handleInputChange("additionalInfo.releaseDate", e.target.value)
              }
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-200 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}