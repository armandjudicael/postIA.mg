import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CreditCard, 
  Download, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Crown, 
  Zap, 
  TrendingUp,
  FileText,
  Bell,
  Settings,
  Star
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BillingData {
  currentPlan: string;
  planPrice: number;
  billingCycle: string;
  nextBilling: string;
  creditsUsed: number;
  creditsTotal: number;
  paymentMethods: PaymentMethod[];
  invoices: Invoice[];
  usage: UsageData;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: string;
  description: string;
  downloadUrl?: string;
}

interface UsageData {
  postsGenerated: number;
  aiCreditsUsed: number;
  storageUsed: number;
  apiCalls: number;
}

const plans = [
  {
    name: "Free",
    price: 0,
    credits: 50,
    features: ["5 AI-generated posts", "Basic analytics", "Standard support"],
    popular: false
  },
  {
    name: "Pro",
    price: 29,
    credits: 500,
    features: ["Unlimited posts", "Advanced analytics", "Priority support", "API access"],
    popular: true
  },
  {
    name: "Enterprise",
    price: 99,
    credits: 2000,
    features: ["Everything in Pro", "Custom integrations", "Dedicated manager", "SLA"],
    popular: false
  }
];

export default function BillingDashboard() {
  const [billingData, setBillingData] = useState<BillingData>(() => {
    const saved = localStorage.getItem('billingData');
    return saved ? JSON.parse(saved) : {
      currentPlan: "Pro",
      planPrice: 29,
      billingCycle: "monthly",
      nextBilling: "2024-01-15",
      creditsUsed: 342,
      creditsTotal: 500,
      paymentMethods: [
        {
          id: "1",
          type: "Visa",
          last4: "4242",
          expiry: "12/25",
          isDefault: true
        }
      ],
      invoices: [
        {
          id: "INV-001",
          date: "2023-12-15",
          amount: 29,
          status: "paid",
          description: "Pro Plan - Monthly"
        },
        {
          id: "INV-002",
          date: "2023-11-15",
          amount: 29,
          status: "paid",
          description: "Pro Plan - Monthly"
        }
      ],
      usage: {
        postsGenerated: 24,
        aiCreditsUsed: 342,
        storageUsed: 1.2,
        apiCalls: 156
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('billingData', JSON.stringify(billingData));
  }, [billingData]);

  const handlePlanChange = (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    if (plan) {
      setBillingData(prev => ({
        ...prev,
        currentPlan: planName,
        planPrice: plan.price,
        creditsTotal: plan.credits
      }));
      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${planName} plan`,
      });
    }
  };

  const handlePayment = () => {
    toast({
      title: "Payment Processed",
      description: "Your payment has been processed successfully",
    });
  };

  const downloadInvoice = (invoiceId: string) => {
    // Simulate PDF download
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} is being downloaded`,
    });
  };

  const creditsPercentage = (billingData.creditsUsed / billingData.creditsTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          Billing & Subscription
        </h2>
        <p className="text-muted-foreground">
          Manage your subscription, payment methods, and view usage analytics.
        </p>
      </div>

      {/* Alert for upcoming billing */}
      <Alert className="bg-gradient-subtle border-primary/20">
        <Bell className="h-4 w-4" />
        <AlertDescription>
          Your next billing date is {billingData.nextBilling}. Your {billingData.currentPlan} plan will be renewed automatically.
        </AlertDescription>
      </Alert>

      {/* Current Plan Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary border-0 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-white/90">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5" />
              <span className="text-2xl font-bold">{billingData.currentPlan}</span>
            </div>
            <p className="text-white/80 text-sm mt-1">
              ${billingData.planPrice}/{billingData.billingCycle}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-subtle border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">AI Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{billingData.creditsUsed}</span>
                <span className="text-sm text-muted-foreground">/ {billingData.creditsTotal}</span>
              </div>
              <Progress value={creditsPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {billingData.creditsTotal - billingData.creditsUsed} credits remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-subtle border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${billingData.planPrice}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Next billing: {billingData.nextBilling}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-subtle border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-ai-success" />
              <span className="text-sm font-medium">Up to Date</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Auto-renewal enabled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Usage Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-subtle border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-ai-accent" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Posts Generated</span>
                  <span className="font-semibold">{billingData.usage.postsGenerated}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Credits Used</span>
                  <span className="font-semibold">{billingData.usage.aiCreditsUsed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Used</span>
                  <span className="font-semibold">{billingData.usage.storageUsed} GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Calls</span>
                  <span className="font-semibold">{billingData.usage.apiCalls}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                {billingData.paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{method.type} •••• {method.last4}</div>
                        <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                      </div>
                    </div>
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card 
                key={plan.name}
                className={`relative ${plan.popular ? 'border-primary bg-gradient-subtle' : 'bg-gradient-subtle border-white/10'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>{plan.credits} AI credits included</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-ai-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={billingData.currentPlan === plan.name ? "secondary" : "default"}
                    disabled={billingData.currentPlan === plan.name}
                    onClick={() => handlePlanChange(plan.name)}
                  >
                    {billingData.currentPlan === plan.name ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card className="bg-gradient-subtle border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Invoice History
              </CardTitle>
              <CardDescription>
                Download and manage your billing invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingData.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-white/10">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{invoice.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {invoice.date} • Invoice {invoice.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-semibold">${invoice.amount}</div>
                        <Badge 
                          variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => downloadInvoice(invoice.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-gradient-subtle border-white/10">
              <CardHeader>
                <CardTitle>Billing Preferences</CardTitle>
                <CardDescription>
                  Manage your billing and notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Auto-renewal</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email notifications</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Usage alerts</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Update Preferences
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-white/10">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common billing actions and support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Update Payment Method
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download Usage Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive">
                  <Calendar className="h-4 w-4 mr-2" />
                  Cancel Subscription
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}