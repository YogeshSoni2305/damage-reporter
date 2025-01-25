import { getAllReports } from "@/utils/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reports = () => {
  const reports = getAllReports();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submitted Reports</h1>
      <div className="grid gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>
                {report.damageType.charAt(0).toUpperCase() + report.damageType.slice(1)} Damage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Description:</strong> {report.description}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Coordinates:</strong> {report.coordinates.lat}, {report.coordinates.lng}</p>
                <p><strong>Submitted:</strong> {new Date(report.createdAt).toLocaleString()}</p>
                <img 
                  src={report.photo} 
                  alt="Damage photo" 
                  className="mt-4 max-w-full h-auto rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;