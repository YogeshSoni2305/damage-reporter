import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { saveReport } from "@/utils/db";
import { getAddressFromCoordinates } from "@/utils/location";

const Index = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [damageType, setDamageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationRequest = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(coords);
          
          // Get human-readable address
          const addressResult = await getAddressFromCoordinates(coords.lat, coords.lng);
          setAddress(addressResult);
          
          toast({
            title: "Location detected",
            description: "Your current location has been captured.",
          });
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to get your location. Please try again.",
          });
          console.error("Location error:", error);
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Not supported",
        description: "Geolocation is not supported by your browser.",
      });
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      toast({
        title: "Photo uploaded",
        description: "Your photo has been successfully uploaded.",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!location || !photo || !description || !damageType) {
        throw new Error("Please fill in all required fields");
      }

      await saveReport({
        damageType,
        description,
        location: address,
        coordinates: location,
        photo,
      });

      toast({
        title: "Report submitted",
        description: "Thank you for reporting this damage.",
      });

      // Reset form
      setPhoto(null);
      setDescription("");
      setDamageType("");
      setLocation(null);
      setAddress("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit report. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Report Public Infrastructure Damage</CardTitle>
          <CardDescription>
            Help us maintain our community by reporting damages to public property,
            roads, or bridges.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photo">Upload Photo</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => document.getElementById("photo")?.click()}
                >
                  {photo ? (
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Photo Selected
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Take/Upload Photo
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="damageType">Type of Damage</Label>
              <Select value={damageType} onValueChange={setDamageType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select damage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pothole">Pothole</SelectItem>
                  <SelectItem value="bridge">Bridge Damage</SelectItem>
                  <SelectItem value="sidewalk">Sidewalk Damage</SelectItem>
                  <SelectItem value="streetlight">Street Light Issue</SelectItem>
                  <SelectItem value="graffiti">Graffiti</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please describe the damage in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleLocationRequest}
              >
                {location ? "Location Detected ✓" : "Detect My Location"}
              </Button>
              {location && (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Coordinates: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}</p>
                  <p>Address: {address}</p>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;