'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  TrendingUp,
  FileText,
  GraduationCap,
  Bed,
  Wallet,
  Building,
  Map,
  Users,
  Briefcase,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ProgressBar from "./ProgressBar";
import { getDashboardSummary } from "../services/dashboardService";

interface UserCardProps {
  title: string;
  value?: number | string;
  type: string;
  region?: string;
  district?: string;
  school?: string;
}

type Color = "indigo" | "red" | "gray" | "orange" | "yellow" | "green" | "blue" | "purple" | "pink";

const UserCard = ({ title, value, type, region, district, school }: UserCardProps) => {
  const [cardData, setCardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const summary = await getDashboardSummary(region, district, school);
        if (summary) {
          setCardData(summary[type]);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard summary', error);
      } finally {
        setLoading(false);
      }
    };

    if (type !== 'Regions' && type !== 'Districts' && type !== 'Users') {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [region, district, school, type]);

  if (loading) {
    return <div className="rounded-lg bg-white p-4 shadow-md flex-1 min-w-[150px]">Loading...</div>;
  }

  if (!cardData && type !== 'Regions' && type !== 'Districts' && type !== 'Users') {
    return <div className="rounded-lg bg-white p-4 shadow-md flex-1 min-w-[150px]">No data available</div>;
  }

  const admissionData = [
    { name: "Boarding", value: cardData?.boarding || 0 },
    { name: "Day", value: cardData?.day || 0 },
  ];

  const COLORS = ["#D1B3F7", "#e8e8e8ff"];

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 34) return "#F7A6A6"; // Red
    if (percentage < 67) return "#FAE27C"; // Yellow
    return "#A8E6A1"; // Green
  };

  const formatNumber = (num: number | string | null | undefined) => {
    if (num === undefined || num === null) return '0';
    const numericVal = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numericVal)) return '0';
    
    if (numericVal >= 1000000000) {
      return `${(numericVal / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
    }
    if (numericVal >= 1000000) {
      return `${(numericVal / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (numericVal >= 1000) {
      return `${(numericVal / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return numericVal.toString();
  };

  const getCardInfo = (
    type: string
  ): { icon: React.ElementType; color: Color } => {
    switch (type) {
      case "Application":
        return { icon: FileText, color: "indigo" };
      case "Admission":
        return { icon: GraduationCap, color: "red" };
      case "Accommodation":
        return { icon: Bed, color: "gray" };
      case "Fund":
        return { icon: Wallet, color: "orange" };
      case "Schools":
        return { icon: Building, color: "yellow" };
      case "Regions":
        return { icon: Map, color: "green" };
      case "Districts":
        return { icon: Map, color: "blue" };
      case "Users":
        return { icon: Users, color: "purple" };
      case "Teachers":
        return { icon: Briefcase, color: "pink" };
      default:
        return { icon: Users, color: "gray" };
    }
  };

  const getCardColors = (type: string) => {
    switch (type) {
      case 'Regions':
        return 'bg-green-100 text-green-800';
      case 'Districts':
        return 'bg-blue-100 text-blue-800';
      case 'Schools':
        return 'bg-yellow-100 text-yellow-800';
      case 'Students':
        return 'bg-purple-100 text-purple-800';
      case 'Teachers':
        return 'bg-orange-100 text-orange-800';
      case 'Upload':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-white text-gray-800';
    }
  };

  const { icon: Icon, color: iconColor } = getCardInfo(type);
  const displayValue = (type === 'Regions' || type === 'Districts' || type === 'Users') ? value : cardData?.value;

  return (
    <div className={`rounded-lg p-4 shadow-md flex-1 min-w-[150px] ${getCardColors(type)}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="capitalize text-sm font-medium">{title}</h2>
        <span className={`p-2 rounded-full bg-${iconColor}-100 text-${iconColor}-500`}>
          <Icon size={20} />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          {type === "Fund" ? `GH₵ ${formatNumber(displayValue)}` : formatNumber(value || displayValue)}
        </h1>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      {type === "Application" && cardData && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#C3EBFA] mr-2"></span>
              <span>New: {cardData.new}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#FAE27C] mr-2"></span>
              <span>Pending: {cardData.pending}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#A8E6A1] mr-2"></span>
              <span>Accepted: {cardData.accepted}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#F7A6A6] mr-2"></span>
              <span>Declined: {cardData.declined}</span>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={(cardData.accepted / cardData.value) * 100} className="bg-gradient-to-r from-[#C3EBFA] to-[#A8E6A1]" />
            <div className="flex justify-end items-center space-x-1 mt-1">
              <TrendingUp size={20} className="text-green-600" />
              <p className="text-xs text-gray-500">
                <span className="text-green-600 font-bold">+15%</span> vs last
                year
              </p>
            </div>
          </div>
        </div>
      )}
      {(type === "Schools" || type === "Zones" || type === "Students" || type === "Teachers") && cardData && (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#C3EBFA] mr-2"></span>
              <span>New: {cardData.new}</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#FAE27C] mr-2"></span>
              <span>Pending: {cardData.pending}</span>
            </div>
          </div>
        </div>
      )}
      {type === "Admission" && cardData && (
        <div className="relative">
          <ResponsiveContainer width="100%" height={100}>
            <PieChart>
              <Pie
                data={admissionData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                fill="#b4b1f5ff"
                paddingAngle={5}
                dataKey="value"
              >
                {admissionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 pb-5 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-xs font-bold text-purple-600">{`${Math.round(
              (cardData.boarding / cardData.value) * 100
            )}%`}</span>
            <div className="w-4/5 border-t border-gray-300 my-0.5"></div>
            <span className="text-xs font-bold text-gray-400">{`${Math.round(
              (cardData.day / cardData.value) * 100
            )}%`}</span>
          </div>
          <div className="flex justify-center space-x-4 text-xs mt-2">
            <div className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS[0 % COLORS.length] }}
              ></span>
              <span>Boarding: {cardData.boarding}</span>
            </div>
            <div className="flex items-center">
              <span
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: COLORS[1 % COLORS.length] }}
              ></span>
              <span>Day: {cardData.day}</span>
            </div>
          </div>
        </div>
      )}
      {type === "Accommodation" && cardData && cardData.boys && cardData.girls && (
        <div className="mt-4">
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Overall Capacity</span>
            <span className="font-bold">{`${Math.round((cardData.available / cardData.total) * 100)}%`}</span>
          </div>
          <ProgressBar value={(cardData.available / cardData.total) * 100} color="#D1B3F7" wrapperClassName="mt-1" />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Boys’ Capacity</span>
            <span className="font-bold">{`${Math.round(((cardData.boys.total - cardData.boys.occupied) / cardData.boys.total) * 100)}%`}</span>
          </div>
          <ProgressBar value={((cardData.boys.total - cardData.boys.occupied) / cardData.boys.total) * 100} color="#C3EBFA" wrapperClassName="mt-1" />
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-500">Girls’ Capacity</span>
            <span className="font-bold">{`${Math.round(((cardData.girls.total - cardData.girls.occupied) / cardData.girls.total) * 100)}%`}</span>
          </div>
          <ProgressBar value={((cardData.girls.total - cardData.girls.occupied) / cardData.girls.total) * 100} color="#FAE27C" wrapperClassName="mt-1" />
        </div>
      )}
      {type === "Fund" && cardData && cardData.sources && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-gray-500">Target: GH₵ {formatNumber(cardData.target)}</span>
            <div className="flex items-center text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>{cardData.trend}%</span>
            </div>
          </div>
          <ProgressBar
            value={(cardData.value / cardData.target) * 100}
            color={getProgressBarColor((cardData.value / cardData.target) * 100)}
            height="h-4"
            label={`${Math.round((cardData.value / cardData.target) * 100)}%`}
            wrapperClassName="mt-1"
          />

          <div className="flex justify-between items-center text-xs mt-2 mb-1">
            <span className="text-gray-500">Source of Funds?</span>
          </div>
          <div className="flex w-full h-2 rounded-full overflow-hidden bg-gray-200">
            {cardData.sources.map((source: any) => (
              <div
                key={source.name}
                className="h-full"
                style={{
                  width: `${(source.value / cardData.target) * 100}%`,
                  backgroundColor: source.color
                }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] mt-1">
            {cardData.sources.slice(0, 4).map((source: any) => (
              <div key={source.name} className="flex items-center">
                <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: source.color }}></span>
                <span>{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;