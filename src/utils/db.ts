interface DamageReport {
  damageType: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  photo: File;
}

interface SavedReport extends DamageReport {
  id: string;
  createdAt: string;
  photo: string; // Base64 string
}

export const saveReport = async (data: DamageReport) => {
  try {
    // Convert File to base64 string for storage
    const reader = new FileReader();
    const photoBase64 = await new Promise<string>((resolve, reject) => {
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(data.photo);
    });

    const report = {
      ...data,
      photo: photoBase64,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Get existing reports or initialize empty array
    const existingReports = JSON.parse(localStorage.getItem('damageReports') || '[]');
    
    // Add new report
    existingReports.push(report);
    
    // Save back to localStorage
    localStorage.setItem('damageReports', JSON.stringify(existingReports));

    return { success: true, id: report.id };
  } catch (error) {
    console.error('Storage error:', error);
    throw new Error('Failed to save report');
  }
};

// New function to get all reports
export const getAllReports = (): SavedReport[] => {
  const reports = JSON.parse(localStorage.getItem('damageReports') || '[]');
  return reports;
};

// New function to get a single report by ID
export const getReportById = (id: string): SavedReport | null => {
  const reports = getAllReports();
  return reports.find(report => report.id === id) || null;
};

// New function to get the latest report
export const getLatestReport = (): SavedReport | null => {
  const reports = getAllReports();
  return reports.length > 0 ? reports[reports.length - 1] : null;
};