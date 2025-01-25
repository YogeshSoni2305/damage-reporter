interface DamageReport {
  damageType: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  photo: File;
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