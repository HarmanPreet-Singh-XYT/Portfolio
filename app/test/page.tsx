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
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
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
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {item}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-muted-foreground hover:text-foreground"
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertDescription>
              App created successfully! ID: {createdAppId}
            </AlertDescription>
          </Alert>
          <Button onClick={reset} className="mt-4">
            Create Another App
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Create New App</h1>
          <p className="text-gray-600 mt-2">Configure all aspects of your new application</p>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <Tabs defaultValue="basic" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="store">Store Info</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Core app details and configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="id">App ID *</Label>
                      <Input
                        id="id"
                        value={formData.id}
                        onChange={(e) => updateField('id', e.target.value)}
                        placeholder="unique-app-id"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="name">App Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="My Awesome App"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => updateField('shortDescription', e.target.value)}
                      placeholder="Brief description of your app"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      placeholder="Detailed description of your app's features and benefits"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="icon">App Icon URL</Label>
                      <Input
                        id="icon"
                        value={formData.icon}
                        onChange={(e) => updateField('icon', e.target.value)}
                        placeholder="https://example.com/icon.png"
                      />
                    </div>
                    <div>
                      <Label htmlFor="headerImage">Header Image URL</Label>
                      <Input
                        id="headerImage"
                        value={formData.headerImage}
                        onChange={(e) => updateField('headerImage', e.target.value)}
                        placeholder="https://example.com/header.jpg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPrivate"
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => updateField('isPrivate', checked)}
                    />
                    <Label htmlFor="isPrivate">Private App</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasInAppPurchases"
                      checked={formData.hasInAppPurchases}
                      onCheckedChange={(checked) => updateField('hasInAppPurchases', checked)}
                    />
                    <Label htmlFor="hasInAppPurchases">Has In-App Purchases</Label>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Button Configuration</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="wishlist"
                          checked={formData.buttons.wishlist}
                          onCheckedChange={(checked) => updateField('buttons.wishlist', checked)}
                        />
                        <Label htmlFor="wishlist">Show Wishlist Button</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="share"
                          checked={formData.buttons.share}
                          onCheckedChange={(checked) => updateField('buttons.share', checked)}
                        />
                        <Label htmlFor="share">Show Share Button</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="demo"
                          checked={formData.buttons.demo}
                          onCheckedChange={(checked) => updateField('buttons.demo', checked)}
                        />
                        <Label htmlFor="demo">Show Demo Button</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media & Assets</CardTitle>
                  <CardDescription>Screenshots, videos, and visual assets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="trailerUrl">Trailer Video URL</Label>
                      <Input
                        id="trailerUrl"
                        value={formData.trailerUrl}
                        onChange={(e) => updateField('trailerUrl', e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="demoLink">Demo Link</Label>
                      <Input
                        id="demoLink"
                        value={formData.demoLink}
                        onChange={(e) => updateField('demoLink', e.target.value)}
                        placeholder="https://demo.example.com"
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

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Card Details</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardImage">Card Image URL</Label>
                          <Input
                            id="cardImage"
                            value={formData.cardDetails.image}
                            onChange={(e) => updateField('cardDetails.image', e.target.value)}
                            placeholder="https://example.com/card.jpg"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardType">Card Type</Label>
                          <Input
                            id="cardType"
                            value={formData.cardDetails.type}
                            onChange={(e) => updateField('cardDetails.type', e.target.value)}
                            placeholder="featured, standard, etc."
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cardTitle">Card Title</Label>
                        <Input
                          id="cardTitle"
                          value={formData.cardDetails.title}
                          onChange={(e) => updateField('cardDetails.title', e.target.value)}
                          placeholder="Card display title"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardDescription">Card Description</Label>
                        <Textarea
                          id="cardDescription"
                          value={formData.cardDetails.description}
                          onChange={(e) => updateField('cardDetails.description', e.target.value)}
                          placeholder="Card description"
                          rows={3}
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
              <Card>
                <CardHeader>
                  <CardTitle>Technical Information</CardTitle>
                  <CardDescription>Technology stack and permissions</CardDescription>
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

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="releaseDate">Release Date</Label>
                        <Input
                          id="releaseDate"
                          type="date"
                          value={formData.additionalInfo.releaseDate}
                          onChange={(e) => updateField('additionalInfo.releaseDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.additionalInfo.category}
                          onChange={(e) => updateField('additionalInfo.category', e.target.value)}
                          placeholder="Productivity, Games, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="size">App Size</Label>
                        <Input
                          id="size"
                          value={formData.additionalInfo.size}
                          onChange={(e) => updateField('additionalInfo.size', e.target.value)}
                          placeholder="25 MB"
                        />
                      </div>
                      <div>
                        <Label htmlFor="version">Version</Label>
                        <Input
                          id="version"
                          value={formData.additionalInfo.version}
                          onChange={(e) => updateField('additionalInfo.version', e.target.value)}
                          placeholder="1.0.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="developer">Developer</Label>
                        <Input
                          id="developer"
                          value={formData.additionalInfo.developer}
                          onChange={(e) => updateField('additionalInfo.developer', e.target.value)}
                          placeholder="Developer name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="publisher">Publisher</Label>
                        <Input
                          id="publisher"
                          value={formData.additionalInfo.publisher}
                          onChange={(e) => updateField('additionalInfo.publisher', e.target.value)}
                          placeholder="Publisher name"
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
              <Card>
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Store links and FAQ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Store Links</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex gap-2">
                        <Select
                          value={newStoreLink.platform}
                          onValueChange={(value) => setNewStoreLink(prev => ({ ...prev, platform: value }))}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="windows">Windows</SelectItem>
                            <SelectItem value="android">Android</SelectItem>
                            <SelectItem value="ios">iOS</SelectItem>
                            <SelectItem value="web">Web</SelectItem>
                            <SelectItem value="linux">Linux</SelectItem>
                            <SelectItem value="macos">macOS</SelectItem>
                            <SelectItem value="server">Server</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={newStoreLink.url}
                          onChange={(e) => setNewStoreLink(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="Store URL"
                          className="flex-1"
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
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {formData.storeLinks.map((link, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">
                              <Badge variant="outline" className="mr-2">{link.platform}</Badge>
                              {link.url}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromArray('storeLinks', index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">FAQ</Label>
                    <div className="mt-2 space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        <Input
                          value={newFAQ.question}
                          onChange={(e) => setNewFAQ(prev => ({ ...prev, question: e.target.value }))}
                          placeholder="FAQ Question"
                        />
                        <Textarea
                          value={newFAQ.answer}
                          onChange={(e) => setNewFAQ(prev => ({ ...prev, answer: e.target.value }))}
                          placeholder="FAQ Answer"
                          rows={2}
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
                          className="w-fit"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add FAQ
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        {formData.faq.map((faq, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{faq.question}</p>
                                <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromArray('faq', index)}
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
              <Card>
                <CardHeader>
                  <CardTitle>Support Information</CardTitle>
                  <CardDescription>Contact details and support channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="supportEmail">Support Email *</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={formData.support.email}
                      onChange={(e) => updateField('support.email', e.target.value)}
                      placeholder="support@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportWebsite">Support Website</Label>
                    <Input
                      id="supportWebsite"
                      value={formData.support.website}
                      onChange={(e) => updateField('support.website', e.target.value)}
                      placeholder="https://support.example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={formData.support.phone}
                      onChange={(e) => updateField('support.phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Information</CardTitle>
                  <CardDescription>Privacy policy and terms of service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="privacyPolicy">Privacy Policy URL</Label>
                    <Input
                      id="privacyPolicy"
                      value={formData.legalLinks.privacyPolicy}
                      onChange={(e) => updateField('legalLinks.privacyPolicy', e.target.value)}
                      placeholder="https://example.com/privacy"
                    />
                  </div>
                  <div>
                    <Label htmlFor="termsOfService">Terms of Service URL</Label>
                    <Input
                      id="termsOfService"
                      value={formData.legalLinks.termsOfService}
                      onChange={(e) => updateField('legalLinks.termsOfService', e.target.value)}
                      placeholder="https://example.com/terms"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={reset}>
              Reset Form
            </Button>
            <Button type="button" disabled={loading} onClick={handleSubmit}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating App...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create App
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}