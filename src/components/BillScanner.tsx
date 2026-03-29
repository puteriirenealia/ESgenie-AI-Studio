import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { GoogleGenAI } from "@google/genai";

interface BillScannerProps {
  onScanComplete: (data: any) => void;
  onLog: (log: any) => void;
}

export const BillScanner: React.FC<BillScannerProps> = ({ onScanComplete, onLog }) => {
  const [isScanning, setIsScanning] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsScanning(true);
    onLog({ type: 'PLAN', message: 'Received bill image. Planning extraction strategy...' });
    onLog({ 
      type: 'PLAN', 
      message: 'Steps: 1. Identify bill type, 2. Extract numeric ESG fields, 3. Validate values, 4. Auto-fill form.' 
    });

    try {
      onLog({ type: 'VISION', message: 'Sending bill image to Gemini Vision for extraction...' });
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.readAsDataURL(file);
      });
      
      const base64Data = await base64Promise;

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      };

      const prompt = `
        You are an expert ESG data extractor. Scan this utility bill and extract the following fields in a single JSON object:
        - company_name (string, the name of the CUSTOMER or company being billed. This is NOT the utility provider like Tenaga Nasional Berhad, TNB, or Air Selangor. Look for the billing address recipient.)
        - bill_type (Electricity, Water, or Fuel)
        - bill_month (string, e.g., "February 2026")
        - amount_myr (number)
        - electricity_kwh (number, if applicable)
        - fuel_litres (number, if applicable)
        - water_m3 (number, if applicable)
        
        Return ONLY the JSON object.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts: [imagePart, { text: prompt }] },
        config: { responseMimeType: "application/json" }
      });

      const text = response.text;
      if (!text) throw new Error("No response from AI");
      
      const data = JSON.parse(text);
      onLog({ 
        type: 'RESULT', 
        message: `Successfully read bill: ${file.name}`,
        detail: JSON.stringify(data, null, 2)
      });
      onLog({ type: 'RESULT', message: 'Form fields populated from bill data. Please review.' });
      
      onScanComplete(data);
    } catch (error: any) {
      console.error(error);
      onLog({ type: 'REFLECTION', message: `Error during bill scanning: ${error.message || 'Unknown error'}. Please try again or fill manually.` });
    } finally {
      setIsScanning(false);
    }
  }, [onScanComplete, onLog]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    multiple: false
  } as any);

  return (
    <div className="terminal-card p-6 mb-6 border-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-terminal-green" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Bill Scanner</h2>
        </div>
        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30 font-bold">GEMINI VISION</span>
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed border-terminal-border rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer transition-all",
          isDragActive ? "border-terminal-green bg-terminal-green/5" : "hover:border-terminal-green/50 hover:bg-white/5",
          isScanning && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        {isScanning ? (
          <>
            <Loader2 className="w-10 h-10 text-terminal-green animate-spin mb-4" />
            <p className="text-sm text-terminal-green animate-pulse">Analyzing Bill Structure...</p>
          </>
        ) : (
          <>
            <Upload className="w-10 h-10 text-gray-600 mb-4" />
            <p className="text-sm text-gray-400 text-center">
              Drag & drop bill photos here, or tap to browse
            </p>
            <p className="text-[10px] text-gray-600 mt-2 uppercase">TNB • PETRONAS • AIR SELANGOR SUPPORTED</p>
          </>
        )}
      </div>
    </div>
  );
};
