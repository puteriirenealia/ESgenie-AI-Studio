import React from 'react';
import { ESGData } from '@/src/types';
import { Settings } from 'lucide-react';

interface ESGFormProps {
  data: ESGData;
  onChange: (data: ESGData) => void;
}

export const ESGForm: React.FC<ESGFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ESGData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="terminal-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-terminal-green" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Company ESG Data</h2>
        </div>
        <span className="text-[10px] bg-terminal-green/20 text-terminal-green px-2 py-0.5 rounded border border-terminal-green/30 font-bold">AGENT INPUT</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="terminal-label">Company Name</label>
            <input 
              type="text" 
              className="terminal-input w-full" 
              value={data.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </div>
          <div>
            <label className="terminal-label">Industry Sector</label>
            <select 
              className="terminal-input w-full"
              value={data.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
            >
              <option value="Manufacturing">Manufacturing</option>
              <option value="Technology">Technology</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Energy">Energy</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>
        </div>

        <div className="hidden md:block" />

        {/* Environmental */}
        <div className="col-span-full border-t border-terminal-border pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-terminal-border" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Environmental Metrics</span>
            <div className="h-[1px] flex-1 bg-terminal-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="terminal-label">Monthly Electricity (kWh) - TNB</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.electricityKwh}
                onChange={(e) => handleChange('electricityKwh', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">Monthly Fuel (Litres) - PETRONAS</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.fuelLitres}
                onChange={(e) => handleChange('fuelLitres', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">Monthly Waste (kg) - Alam Flora</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.wasteKg}
                onChange={(e) => handleChange('wasteKg', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">Waste Recycled (kg)</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.recycledKg}
                onChange={(e) => handleChange('recycledKg', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">Water Consumptions (m³) - Air Selangor</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.waterM3}
                onChange={(e) => handleChange('waterM3', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="col-span-full border-t border-terminal-border pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-terminal-border" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Social Metrics</span>
            <div className="h-[1px] flex-1 bg-terminal-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="terminal-label">Total Employees</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.totalEmployees}
                onChange={(e) => handleChange('totalEmployees', parseInt(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">% Women in Leadership</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.womenLeadershipPct}
                onChange={(e) => handleChange('womenLeadershipPct', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">Average Training Hours</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.trainingHours}
                onChange={(e) => handleChange('trainingHours', parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="terminal-label">% Budget Spent on Local Suppliers</label>
              <input 
                type="number" 
                className="terminal-input w-full" 
                value={data.localSupplierPct}
                onChange={(e) => handleChange('localSupplierPct', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        {/* Governance */}
        <div className="col-span-full border-t border-terminal-border pt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] flex-1 bg-terminal-border" />
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">Governance Metrics</span>
            <div className="h-[1px] flex-1 bg-terminal-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="terminal-label">Anti-Bribery (ABAC)</label>
              <select 
                className="terminal-input w-full"
                value={data.antiBriberyPolicy}
                onChange={(e) => handleChange('antiBriberyPolicy', e.target.value)}
              >
                <option value="No Policy">No Policy</option>
                <option value="Drafted">Drafted</option>
                <option value="Implemented">Implemented</option>
                <option value="Audited">Audited</option>
              </select>
            </div>
            <div>
              <label className="terminal-label">Data Privacy (PDPA)</label>
              <select 
                className="terminal-input w-full"
                value={data.dataPrivacyStatus}
                onChange={(e) => handleChange('dataPrivacyStatus', e.target.value)}
              >
                <option value="Non-Compliant">Non-Compliant</option>
                <option value="Partially Compliant">Partially Compliant</option>
                <option value="PDPA Compliant">PDPA Compliant</option>
              </select>
            </div>
            <div>
              <label className="terminal-label">ESG Policy</label>
              <select 
                className="terminal-input w-full"
                value={data.esgPolicyStatus}
                onChange={(e) => handleChange('esgPolicyStatus', e.target.value)}
              >
                <option value="No Commitment">No Commitment</option>
                <option value="Internal Only">Internal Only</option>
                <option value="Publicly Committed">Publicly Committed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
