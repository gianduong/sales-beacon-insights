
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Cog, Bell, User, Shield, EyeOff, Save } from 'lucide-react';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: 'Sales Beacon',
    emailNotifications: true,
    darkMode: false,
  });

  const [profileSettings, setProfileSettings] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailSales: true,
    emailOrders: true,
    emailInventory: false,
    pushSales: true,
    pushOrders: false,
    pushInventory: false
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareData: false,
    collectAnalytics: true,
    storeHistory: true
  });

  const handleSaveSettings = (settingType: string) => {
    toast.success(`${settingType} settings saved successfully!`);
  };

  return (
    <Layout title="Settings" subtitle="Configure your application preferences">
      <div className="space-y-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Cog className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your basic application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    value={generalSettings.storeName} 
                    onChange={(e) => setGeneralSettings({...generalSettings, storeName: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <div className="text-sm text-gray-500">Enable dark theme for the application</div>
                  </div>
                  <Switch 
                    id="darkMode" 
                    checked={generalSettings.darkMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, darkMode: checked})}
                  />
                </div>

                <Button 
                  onClick={() => handleSaveSettings('General')}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    value={profileSettings.name} 
                    onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profileSettings.email} 
                    onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role"
                    value={profileSettings.role} 
                    onChange={(e) => setProfileSettings({...profileSettings, role: e.target.value})}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Contact an administrator to change your role</p>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('Profile')}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose when and how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="emailSales" 
                          checked={notificationSettings.emailSales}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, emailSales: checked as boolean})}
                        />
                        <Label htmlFor="emailSales">Sales Reports</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="emailOrders" 
                          checked={notificationSettings.emailOrders}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, emailOrders: checked as boolean})}
                        />
                        <Label htmlFor="emailOrders">New Orders</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="emailInventory" 
                          checked={notificationSettings.emailInventory}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, emailInventory: checked as boolean})}
                        />
                        <Label htmlFor="emailInventory">Inventory Updates</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-4 text-lg font-medium">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="pushSales" 
                          checked={notificationSettings.pushSales}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, pushSales: checked as boolean})}
                        />
                        <Label htmlFor="pushSales">Sales Updates</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="pushOrders" 
                          checked={notificationSettings.pushOrders}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, pushOrders: checked as boolean})}
                        />
                        <Label htmlFor="pushOrders">New Orders</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="pushInventory" 
                          checked={notificationSettings.pushInventory}
                          onCheckedChange={(checked) => 
                            setNotificationSettings({...notificationSettings, pushInventory: checked as boolean})}
                        />
                        <Label htmlFor="pushInventory">Inventory Alerts</Label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleSaveSettings('Notification')}
                    className="w-full sm:w-auto"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Configure your data sharing and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="shareData">Data Sharing</Label>
                    <div className="text-sm text-gray-500">Allow sharing of anonymized usage data</div>
                  </div>
                  <Switch 
                    id="shareData" 
                    checked={privacySettings.shareData}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, shareData: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="collectAnalytics">Analytics Collection</Label>
                    <div className="text-sm text-gray-500">Allow collection of performance analytics</div>
                  </div>
                  <Switch 
                    id="collectAnalytics" 
                    checked={privacySettings.collectAnalytics}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, collectAnalytics: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="storeHistory">Session History</Label>
                    <div className="text-sm text-gray-500">Store activity history for personalization</div>
                  </div>
                  <Switch 
                    id="storeHistory" 
                    checked={privacySettings.storeHistory}
                    onCheckedChange={(checked) => setPrivacySettings({...privacySettings, storeHistory: checked})}
                  />
                </div>

                <div className="pt-4">
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => {
                      toast.success("Your browsing data has been cleared");
                    }}
                  >
                    <EyeOff className="mr-2 h-4 w-4" />
                    Clear Browsing Data
                  </Button>
                </div>

                <Button 
                  onClick={() => handleSaveSettings('Privacy')}
                  className="w-full sm:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
