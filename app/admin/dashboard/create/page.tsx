'use client'
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, X, Save, Loader2 } from 'lucide-react';
import { EnhancedCyberpunkEditor } from '@/components/Lexical';

// Mock hook for demonstration
const useCreateApp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdAppId, setCreatedAppId] = useState(null);
  
  const createApp = useCallback(async (appData) => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success/failure
    if (Math.random() > 0.2) {
      const newId = 'app_' + Date.now();
      setCreatedAppId(newId);
      setLoading(false);
      return newId;
    } else {
      setError('Failed to create app');
      setLoading(false);
      return null;
    }
  }, []);
  
  const reset = useCallback(() => {
    setCreatedAppId(null);
    setError(null);
  }, []);
  
  return { createApp, loading, error, createdAppId, reset };
};

export default function AppCreator() {
  const { createApp, loading, error, createdAppId, reset } = useCreateApp();
  
  // Form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    icon: '',
    isPrivate: false,
    headerImage: '',
    trailerUrl: '',
    description: '',
    demoLink: '',
    shortDescription: '',
    hasInAppPurchases: false,
    cardDetails: {
      image: '',
      type: '',
      title: '',
      description: '',
      tech: []
    },
    buttons: {
      wishlist: true,
      share: true,
      demo: true
    },
    screenshots: [],
    techStack: [],
    storeLinks: [],
    permissions: [],
    faq: [],
    support: {
      email: '',
      website: '',
      phone: ''
    },
    additionalInfo: {
      releaseDate: '',
      category: '',
      size: '',
      supportedLanguages: [],
      developer: '',
      publisher: '',
      version: ''
    },
    legalLinks: {
      privacyPolicy: '',
      termsOfService: ''
    }
  });

  const [newTech, setNewTech] = useState('');
  const [newScreenshot, setNewScreenshot] = useState('');
  const [newPermission, setNewPermission] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newStoreLink, setNewStoreLink] = useState({ platform: '', url: '' });
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  const updateField = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const addToArray = (path, item) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = [...(current[keys[keys.length - 1]] || []), item];
      return newData;
    });
  };

  const removeFromArray = (path, index) => {
    setFormData(prev => {
      const keys = path.split('.');
      const newData = { ...prev };
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createApp(formData);
    if (result) {
      // Reset form or show success message
      console.log('App created successfully:', result);
    }
  };

  const ArrayInput = ({ label, items, onAdd, onRemove, newValue, setNewValue, placeholder }) => (
  <div className="space-y-2">
    <Label className="text-emerald-400 font-medium">{label}</Label>
    <div className="flex gap-2">
      <Input
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          if (newValue.trim()) {
            onAdd(newValue.trim());
            setNewValue('');
          }
        }}
        className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white hover:scale-105 transition-all duration-200"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <Badge key={index} variant="secondary" className="bg-gray-800 text-emerald-400 border-emerald-500/30 flex items-center gap-1">
          {item}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-gray-400 hover:text-emerald-400 hover:scale-110 transition-all duration-200"
            onClick={() => onRemove(index)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  </div>
);

if (createdAppId) {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-2xl mx-auto">
        <Alert className="bg-gray-900/40 backdrop-blur-sm border-emerald-500/30">
          <AlertDescription className="text-emerald-400">
            <span className="font-mono">[SUCCESS]</span> App created successfully! ID: <span className="text-white">{createdAppId}</span>
          </AlertDescription>
        </Alert>
        <Button 
          onClick={reset} 
          className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
        >
          Create Another App
        </Button>
      </div>
    </div>
  );
}

return (
  <div className="min-h-screen bg-black p-6">
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-white mb-2">
          <span className="text-emerald-400">&gt;</span> Create New App
        </h1>
        <p className="text-gray-300 text-lg">Configure all aspects of your new application</p>
      </div>

      {error && (
        <Alert className="mb-6 bg-gray-900/40 backdrop-blur-sm border-red-500/30">
          <AlertDescription className="text-red-400">
            <span className="text-red-500">[ERROR]</span> {error}
          </AlertDescription>
        </Alert>
      )}

      <div>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900/40 backdrop-blur-sm border border-gray-700">
            <TabsTrigger 
              value="basic" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="technical" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Technical
            </TabsTrigger>
            <TabsTrigger 
              value="store" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Store Info
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Support
            </TabsTrigger>
            <TabsTrigger 
              value="legal" 
              className="text-gray-300 data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all duration-200"
            >
              Legal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Basic Information</CardTitle>
                <CardDescription className="text-gray-300">Core app details and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="id" className="text-emerald-400">App ID *</Label>
                    <Input
                      id="id"
                      value={formData.id}
                      onChange={(e) => updateField('id', e.target.value)}
                      placeholder="unique-app-id"
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name" className="text-emerald-400">App Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="My Awesome App"
                      required
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shortDescription" className="text-emerald-400">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => updateField('shortDescription', e.target.value)}
                    placeholder="Brief description of your app"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-emerald-400">Full Description</Label>
                  {/* <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Detailed description of your app's features and benefits"
                    rows={4}
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  /> */}
                <EnhancedCyberpunkEditor value={formData.description} onChange={(content) => {updateField('description', content)}} placeholder="Detailed description of your app's features and benefits" className={""}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon" className="text-emerald-400">App Icon URL</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => updateField('icon', e.target.value)}
                      placeholder="https://example.com/icon.png"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="headerImage" className="text-emerald-400">Header Image URL</Label>
                    <Input
                      id="headerImage"
                      value={formData.headerImage}
                      onChange={(e) => updateField('headerImage', e.target.value)}
                      placeholder="https://example.com/header.jpg"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPrivate"
                    checked={formData.isPrivate}
                    onCheckedChange={(checked) => updateField('isPrivate', checked)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                  <Label htmlFor="isPrivate" className="text-gray-300">Private App</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasInAppPurchases"
                    checked={formData.hasInAppPurchases}
                    onCheckedChange={(checked) => updateField('hasInAppPurchases', checked)}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                  <Label htmlFor="hasInAppPurchases" className="text-gray-300">Has In-App Purchases</Label>
                </div>

                <Separator className="border-gray-700" />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400">Button Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="wishlist"
                        checked={formData.buttons.wishlist}
                        onCheckedChange={(checked) => updateField('buttons.wishlist', checked)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                      <Label htmlFor="wishlist" className="text-gray-300">Show Wishlist Button</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="share"
                        checked={formData.buttons.share}
                        onCheckedChange={(checked) => updateField('buttons.share', checked)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                      <Label htmlFor="share" className="text-gray-300">Show Share Button</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="demo"
                        checked={formData.buttons.demo}
                        onCheckedChange={(checked) => updateField('buttons.demo', checked)}
                        className="data-[state=checked]:bg-emerald-600"
                      />
                      <Label htmlFor="demo" className="text-gray-300">Show Demo Button</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Media & Assets</CardTitle>
                <CardDescription className="text-gray-300">Screenshots, videos, and visual assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="trailerUrl" className="text-emerald-400">Trailer Video URL</Label>
                    <Input
                      id="trailerUrl"
                      value={formData.trailerUrl}
                      onChange={(e) => updateField('trailerUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="demoLink" className="text-emerald-400">Demo Link</Label>
                    <Input
                      id="demoLink"
                      value={formData.demoLink}
                      onChange={(e) => updateField('demoLink', e.target.value)}
                      placeholder="https://demo.example.com"
                      className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <ArrayInput
                  label="Screenshots"
                  items={formData.screenshots}
                  onAdd={(url) => addToArray('screenshots', url)}
                  onRemove={(index) => removeFromArray('screenshots', index)}
                  newValue={newScreenshot}
                  setNewValue={setNewScreenshot}
                  placeholder="Screenshot URL"
                />

                <Separator className="border-gray-700" />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400">Card Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardImage" className="text-emerald-400">Card Image URL</Label>
                        <Input
                          id="cardImage"
                          value={formData.cardDetails.image}
                          onChange={(e) => updateField('cardDetails.image', e.target.value)}
                          placeholder="https://example.com/card.jpg"
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cardType" className="text-emerald-400">Card Type</Label>
                        <Input
                          id="cardType"
                          value={formData.cardDetails.type}
                          onChange={(e) => updateField('cardDetails.type', e.target.value)}
                          placeholder="featured, standard, etc."
                          className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardTitle" className="text-emerald-400">Card Title</Label>
                      <Input
                        id="cardTitle"
                        value={formData.cardDetails.title}
                        onChange={(e) => updateField('cardDetails.title', e.target.value)}
                        placeholder="Card display title"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cardDescription" className="text-emerald-400">Card Description</Label>
                      <Textarea
                        id="cardDescription"
                        value={formData.cardDetails.description}
                        onChange={(e) => updateField('cardDetails.description', e.target.value)}
                        placeholder="Card description"
                        rows={3}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <ArrayInput
                      label="Card Technologies"
                      items={formData.cardDetails.tech}
                      onAdd={(tech) => addToArray('cardDetails.tech', tech)}
                      onRemove={(index) => removeFromArray('cardDetails.tech', index)}
                      newValue={newTech}
                      setNewValue={setNewTech}
                      placeholder="Technology name"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Technical Information</CardTitle>
                <CardDescription className="text-gray-300">Technology stack and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ArrayInput
                  label="Tech Stack"
                  items={formData.techStack}
                  onAdd={(tech) => addToArray('techStack', tech)}
                  onRemove={(index) => removeFromArray('techStack', index)}
                  newValue={newTech}
                  setNewValue={setNewTech}
                  placeholder="Technology (e.g., React, Node.js)"
                />

                <ArrayInput
                  label="Permissions"
                  items={formData.permissions}
                  onAdd={(permission) => addToArray('permissions', permission)}
                  onRemove={(index) => removeFromArray('permissions', index)}
                  newValue={newPermission}
                  setNewValue={setNewPermission}
                  placeholder="Permission (e.g., Camera, Location)"
                />

                <Separator className="border-gray-700" />

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400">Additional Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="releaseDate" className="text-emerald-400">Release Date</Label>
                      <Input
                        id="releaseDate"
                        type="date"
                        value={formData.additionalInfo.releaseDate}
                        onChange={(e) => updateField('additionalInfo.releaseDate', e.target.value)}
                                                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category" className="text-emerald-400">Category</Label>
                      <Input
                        id="category"
                        value={formData.additionalInfo.category}
                        onChange={(e) => updateField('additionalInfo.category', e.target.value)}
                        placeholder="Productivity, Games, etc."
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="size" className="text-emerald-400">App Size</Label>
                      <Input
                        id="size"
                        value={formData.additionalInfo.size}
                        onChange={(e) => updateField('additionalInfo.size', e.target.value)}
                        placeholder="25 MB"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="version" className="text-emerald-400">Version</Label>
                      <Input
                        id="version"
                        value={formData.additionalInfo.version}
                        onChange={(e) => updateField('additionalInfo.version', e.target.value)}
                        placeholder="1.0.0"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="developer" className="text-emerald-400">Developer</Label>
                      <Input
                        id="developer"
                        value={formData.additionalInfo.developer}
                        onChange={(e) => updateField('additionalInfo.developer', e.target.value)}
                        placeholder="Developer name"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="publisher" className="text-emerald-400">Publisher</Label>
                      <Input
                        id="publisher"
                        value={formData.additionalInfo.publisher}
                        onChange={(e) => updateField('additionalInfo.publisher', e.target.value)}
                        placeholder="Publisher name"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <ArrayInput
                      label="Supported Languages"
                      items={formData.additionalInfo.supportedLanguages}
                      onAdd={(lang) => addToArray('additionalInfo.supportedLanguages', lang)}
                      onRemove={(index) => removeFromArray('additionalInfo.supportedLanguages', index)}
                      newValue={newLanguage}
                      setNewValue={setNewLanguage}
                      placeholder="Language (e.g., English, Spanish)"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Store Information</CardTitle>
                <CardDescription className="text-gray-300">Store links and FAQ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium text-emerald-400">Store Links</Label>
                  <div className="mt-2 space-y-3">
                    <div className="flex gap-2">
                      <Select
                        value={newStoreLink.platform}
                        onValueChange={(value) => setNewStoreLink(prev => ({ ...prev, platform: value }))}
                      >
                        <SelectTrigger className="w-40 bg-gray-800 border-gray-700 text-white focus:border-emerald-500 focus:ring-emerald-500">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="windows" className="text-white hover:bg-gray-700 focus:bg-emerald-600">Windows</SelectItem>
                          <SelectItem value="android" className="text-white hover:bg-gray-700 focus:bg-emerald-600">Android</SelectItem>
                          <SelectItem value="ios" className="text-white hover:bg-gray-700 focus:bg-emerald-600">iOS</SelectItem>
                          <SelectItem value="web" className="text-white hover:bg-gray-700 focus:bg-emerald-600">Web</SelectItem>
                          <SelectItem value="linux" className="text-white hover:bg-gray-700 focus:bg-emerald-600">Linux</SelectItem>
                          <SelectItem value="macos" className="text-white hover:bg-gray-700 focus:bg-emerald-600">macOS</SelectItem>
                          <SelectItem value="server" className="text-white hover:bg-gray-700 focus:bg-emerald-600">Server</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={newStoreLink.url}
                        onChange={(e) => setNewStoreLink(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="Store URL"
                        className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newStoreLink.platform && newStoreLink.url) {
                            addToArray('storeLinks', newStoreLink);
                            setNewStoreLink({ platform: '', url: '' });
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white hover:scale-105 transition-all duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.storeLinks.map((link, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-emerald-500/50 transition-colors duration-200">
                          <span className="text-sm text-white">
                            <Badge variant="outline" className="mr-2 bg-emerald-600 text-white border-emerald-500">
                              {link.platform}
                            </Badge>
                            <span className="font-mono">{link.url}</span>
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromArray('storeLinks', index)}
                            className="text-gray-400 hover:text-red-400 hover:scale-110 transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator className="border-gray-700" />

                <div>
                  <Label className="text-base font-medium text-emerald-400">FAQ</Label>
                  <div className="mt-2 space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      <Input
                        value={newFAQ.question}
                        onChange={(e) => setNewFAQ(prev => ({ ...prev, question: e.target.value }))}
                        placeholder="FAQ Question"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <Textarea
                        value={newFAQ.answer}
                        onChange={(e) => setNewFAQ(prev => ({ ...prev, answer: e.target.value }))}
                        placeholder="FAQ Answer"
                        rows={2}
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (newFAQ.question && newFAQ.answer) {
                            addToArray('faq', newFAQ);
                            setNewFAQ({ question: '', answer: '' });
                          }
                        }}
                        className="w-fit bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white hover:scale-105 transition-all duration-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {formData.faq.map((faq, index) => (
                        <div key={index} className="p-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-emerald-500/50 transition-colors duration-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-sm text-emerald-400">{faq.question}</p>
                              <p className="text-sm text-gray-300 mt-1">{faq.answer}</p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromArray('faq', index)}
                              className="text-gray-400 hover:text-red-400 hover:scale-110 transition-all duration-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Support Information</CardTitle>
                <CardDescription className="text-gray-300">Contact details and support channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="supportEmail" className="text-emerald-400">Support Email *</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={formData.support.email}
                    onChange={(e) => updateField('support.email', e.target.value)}
                    placeholder="support@example.com"
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <Label htmlFor="supportWebsite" className="text-emerald-400">Support Website</Label>
                  <Input
                    id="supportWebsite"
                    value={formData.support.website}
                    onChange={(e) => updateField('support.website', e.target.value)}
                    placeholder="https://support.example.com"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <Label htmlFor="supportPhone" className="text-emerald-400">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={formData.support.phone}
                    onChange={(e) => updateField('support.phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card className="bg-gray-900/40 backdrop-blur-sm border-gray-700 shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-emerald-400 text-xl">Legal Information</CardTitle>
                <CardDescription className="text-gray-300">Privacy policy and terms of service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="privacyPolicy" className="text-emerald-400">Privacy Policy URL</Label>
                  <Input
                    id="privacyPolicy"
                    value={formData.legalLinks.privacyPolicy}
                    onChange={(e) => updateField('legalLinks.privacyPolicy', e.target.value)}
                    placeholder="https://example.com/privacy"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <Label htmlFor="termsOfService" className="text-emerald-400">Terms of Service URL</Label>
                  <Input
                    id="termsOfService"
                    value={formData.legalLinks.termsOfService}
                    onChange={(e) => updateField('legalLinks.termsOfService', e.target.value)}
                    placeholder="https://example.com/terms"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={reset}
            className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-emerald-500 transition-all duration-200"
          >
            <span className="text-red-400">[</span>RESET<span className="text-red-400">]</span>
          </Button>
          <Button 
            type="button" 
            disabled={loading} 
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-emerald-200">[</span>CREATING<span className="text-emerald-200">]</span>
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                <span className="text-emerald-200">[</span>CREATE APP<span className="text-emerald-200">]</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  </div>
);
}