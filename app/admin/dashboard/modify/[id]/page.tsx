'use client'
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Trash2, Plus, Upload, Save, Loader2 } from 'lucide-react';

const AppUpdateComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [appData, setAppData] = useState({
    id: '',
    name: '',
    cardDetails: {
      image: '',
      type: '',
      title: '',
      description: '',
      tech: []
    },
    icon: '',
    buttons: {
      wishlist: true,
      share: true,
      demo: true
    },
    isPrivate: false,
    headerImage: '',
    trailerUrl: '',
    screenshots: [],
    description: '',
    demoLink: '',
    shortDescription: '',
    techStack: [],
    storeLinks: [],
    reviews: [],
    systemRequirements: [],
    developers: [],
    downloadStats: {
      total: '',
      lastMonth: ''
    },
    versionHistory: [],
    hasInAppPurchases: false,
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

  const handleInputChange = (path, value) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayAdd = (path, item) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], item];
      return newData;
    });
  };

  const handleArrayRemove = (path, index) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = current[keys[keys.length - 1]].filter((_, i) => i !== index);
      return newData;
    });
  };

  const handleArrayUpdate = (path, index, value) => {
    setAppData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]][index] = value;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      console.log('App updated:', appData);
    } catch (err) {
      setError('Failed to update app');
    } finally {
      setLoading(false);
    }
  };

  const platformOptions = ['windows', 'android', 'ios', 'web', 'linux', 'macos', 'server'];
  const categoryOptions = ['Games', 'Productivity', 'Entertainment', 'Social', 'Business', 'Education', 'Health', 'Finance'];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Update App</h1>
        <Button onClick={handleSubmit} disabled={loading} className="min-w-32">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update App
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>App updated successfully!</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="store">Store</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="legal">Legal</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="id">App ID</Label>
                    <Input
                      id="id"
                      value={appData.id}
                      onChange={(e) => handleInputChange('id', e.target.value)}
                      placeholder="Enter unique app ID"
                    />
                  </div>
                  <div>
                    <Label htmlFor="name">App Name</Label>
                    <Input
                      id="name"
                      value={appData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter app name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={appData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Brief description for app cards"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    value={appData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed app description"
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="icon">Icon URL</Label>
                    <Input
                      id="icon"
                      value={appData.icon}
                      onChange={(e) => handleInputChange('icon', e.target.value)}
                      placeholder="https://example.com/icon.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="demoLink">Demo Link</Label>
                    <Input
                      id="demoLink"
                      value={appData.demoLink}
                      onChange={(e) => handleInputChange('demoLink', e.target.value)}
                      placeholder="https://demo.example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isPrivate"
                      checked={appData.isPrivate}
                      onCheckedChange={(checked) => handleInputChange('isPrivate', checked)}
                    />
                    <Label htmlFor="isPrivate">Private App</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasInAppPurchases"
                      checked={appData.hasInAppPurchases}
                      onCheckedChange={(checked) => handleInputChange('hasInAppPurchases', checked)}
                    />
                    <Label htmlFor="hasInAppPurchases">In-App Purchases</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cardImage">Card Image URL</Label>
                    <Input
                      id="cardImage"
                      value={appData.cardDetails.image}
                      onChange={(e) => handleInputChange('cardDetails.image', e.target.value)}
                      placeholder="https://example.com/card.png"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardType">Card Type</Label>
                    <Input
                      id="cardType"
                      value={appData.cardDetails.type}
                      onChange={(e) => handleInputChange('cardDetails.type', e.target.value)}
                      placeholder="e.g., featured, new, popular"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardTitle">Card Title</Label>
                  <Input
                    id="cardTitle"
                    value={appData.cardDetails.title}
                    onChange={(e) => handleInputChange('cardDetails.title', e.target.value)}
                    placeholder="Title for app card"
                  />
                </div>

                <div>
                  <Label htmlFor="cardDescription">Card Description</Label>
                  <Textarea
                    id="cardDescription"
                    value={appData.cardDetails.description}
                    onChange={(e) => handleInputChange('cardDetails.description', e.target.value)}
                    placeholder="Description for app card"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Card Technologies</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {appData.cardDetails.tech.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleArrayRemove('cardDetails.tech', index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="newCardTech"
                      placeholder="Add technology"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.target.value.trim();
                          if (value) {
                            handleArrayAdd('cardDetails.tech', value);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('newCardTech');
                        const value = input.value.trim();
                        if (value) {
                          handleArrayAdd('cardDetails.tech', value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Button Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="wishlistBtn"
                      checked={appData.buttons.wishlist}
                      onCheckedChange={(checked) => handleInputChange('buttons.wishlist', checked)}
                    />
                    <Label htmlFor="wishlistBtn">Wishlist Button</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="shareBtn"
                      checked={appData.buttons.share}
                      onCheckedChange={(checked) => handleInputChange('buttons.share', checked)}
                    />
                    <Label htmlFor="shareBtn">Share Button</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="demoBtn"
                      checked={appData.buttons.demo}
                      onCheckedChange={(checked) => handleInputChange('buttons.demo', checked)}
                    />
                    <Label htmlFor="demoBtn">Demo Button</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="headerImage">Header Image URL</Label>
                  <Input
                    id="headerImage"
                    value={appData.headerImage}
                    onChange={(e) => handleInputChange('headerImage', e.target.value)}
                    placeholder="https://example.com/header.png"
                  />
                </div>

                <div>
                  <Label htmlFor="trailerUrl">Trailer URL</Label>
                  <Input
                    id="trailerUrl"
                    value={appData.trailerUrl}
                    onChange={(e) => handleInputChange('trailerUrl', e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div>
                  <Label>Screenshots</Label>
                  <div className="space-y-2">
                    {appData.screenshots.map((screenshot, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={screenshot}
                          onChange={(e) => handleArrayUpdate('screenshots', index, e.target.value)}
                          placeholder="https://example.com/screenshot.png"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleArrayRemove('screenshots', index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleArrayAdd('screenshots', '')}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Screenshot
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Tech Stack</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {appData.techStack.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleArrayRemove('techStack', index)}
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.target.value.trim();
                          if (value) {
                            handleArrayAdd('techStack', value);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('newTech');
                        const value = input.value.trim();
                        if (value) {
                          handleArrayAdd('techStack', value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Permissions</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {appData.permissions.map((permission, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {permission}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0"
                          onClick={() => handleArrayRemove('permissions', index)}
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
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.target.value.trim();
                          if (value) {
                            handleArrayAdd('permissions', value);
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById('newPermission');
                        const value = input.value.trim();
                        if (value) {
                          handleArrayAdd('permissions', value);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={appData.additionalInfo.category} onValueChange={(value) => handleInputChange('additionalInfo.category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">App Size</Label>
                    <Input
                      id="size"
                      value={appData.additionalInfo.size}
                      onChange={(e) => handleInputChange('additionalInfo.size', e.target.value)}
                      placeholder="e.g., 125 MB"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      value={appData.additionalInfo.version}
                      onChange={(e) => handleInputChange('additionalInfo.version', e.target.value)}
                      placeholder="e.g., 1.0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developer">Developer</Label>
                    <Input
                      id="developer"
                      value={appData.additionalInfo.developer}
                      onChange={(e) => handleInputChange('additionalInfo.developer', e.target.value)}
                      placeholder="Developer name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={appData.additionalInfo.publisher}
                      onChange={(e) => handleInputChange('additionalInfo.publisher', e.target.value)}
                      placeholder="Publisher name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="releaseDate">Release Date</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    value={appData.additionalInfo.releaseDate}
                    onChange={(e) => handleInputChange('additionalInfo.releaseDate', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Store Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appData.storeLinks.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <Select value={link.platform} onValueChange={(value) => handleArrayUpdate('storeLinks', index, { ...link, platform: value })}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={link.url}
                      onChange={(e) => handleArrayUpdate('storeLinks', index, { ...link, url: e.target.value })}
                      placeholder="Store URL"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleArrayRemove('storeLinks', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleArrayAdd('storeLinks', { platform: '', url: '' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Store Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {appData.faq.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label>FAQ #{index + 1}</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleArrayRemove('faq', index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={faq.question}
                      onChange={(e) => handleArrayUpdate('faq', index, { ...faq, question: e.target.value })}
                      placeholder="Question"
                      className="mb-2"
                    />
                    <Textarea
                      value={faq.answer}
                      onChange={(e) => handleArrayUpdate('faq', index, { ...faq, answer: e.target.value })}
                      placeholder="Answer"
                      rows={3}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleArrayAdd('faq', { question: '', answer: '' })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={appData.support.email}
                    onChange={(e) => handleInputChange('support.email', e.target.value)}
                    placeholder="support@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="supportWebsite">Support Website</Label>
                  <Input
                    id="supportWebsite"
                    value={appData.support.website}
                    onChange={(e) => handleInputChange('support.website', e.target.value)}
                    placeholder="https://support.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input
                    id="supportPhone"
                    value={appData.support.phone}
                    onChange={(e) => handleInputChange('support.phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Download Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalDownloads">Total Downloads</Label>
                    <Input
                      id="totalDownloads"
                      value={appData.downloadStats.total}
                      onChange={(e) => handleInputChange('downloadStats.total', e.target.value)}
                      placeholder="e.g., 1,000,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastMonthDownloads">Last Month Downloads</Label>
                    <Input
                      id="lastMonthDownloads"
                      value={appData.downloadStats.lastMonth}
                      onChange={(e) => handleInputChange('downloadStats.lastMonth', e.target.value)}
                      placeholder="e.g., 50,000"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Legal Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="privacyPolicy">Privacy Policy URL</Label>
                  <Input
                    id="privacyPolicy"
                    value={appData.legalLinks.privacyPolicy}
                    onChange={(e) => handleInputChange('legalLinks.privacyPolicy', e.target.value)}
                    placeholder="https://example.com/privacy"
                  />
                </div>
                <div>
                  <Label htmlFor="termsOfService">Terms of Service URL</Label>
                  <Input
                    id="termsOfService"
                    value={appData.legalLinks.termsOfService}
                    onChange={(e) => handleInputChange('legalLinks.termsOfService', e.target.value)}
                    placeholder="https://example.com/terms"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supported Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  {appData.additionalInfo.supportedLanguages.map((lang, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {lang}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => handleArrayRemove('additionalInfo.supportedLanguages', index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newLanguage"
                    placeholder="Add language"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.target.value.trim();
                        if (value) {
                          handleArrayAdd('additionalInfo.supportedLanguages', value);
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.getElementById('newLanguage');
                      const value = input.value.trim();
                      if (value) {
                        handleArrayAdd('additionalInfo.supportedLanguages', value);
                        input.value = '';
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AppUpdateComponent;