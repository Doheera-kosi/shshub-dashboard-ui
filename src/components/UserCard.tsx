'use client';

import Image from "next/image";
import {
  TrendingUp,
  FileText,
  GraduationCap,
  Bed,
  Wallet,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ProgressBar from "./ProgressBar";

const UserCard = ({ type }: { type: string }) => {
  const data: { [key: string]: any } = {
    Application: {
      value: 1234,
      new: 300,
      pending: 400,
      accepted: 500,
      declined: 34,
      percentageChange: 15,
    },
    Admission: {
      value: 567,
      boarding: 300,
      day: 267,
    },
    Accommodation: { 
      value: 890, 
      available: 450, 
      total: 890, 
      boys: { 
        total: 342, 
        occupied: 200 
      },
      girls: { 
        total: 548, 
        occupied: 240 
      }, 
    },
        Fund: {
      value: 2500000,
      target: 3000000,
      trend: 12,
      sources: [
        { name: "Fees", value: 1800000, color: "#A8E6A1" },
        { name: "Gov", value: 500000, color: "#C3EBFA" },
        { name: "Donations", value: 150000, color: "#FAE27C" },
        { name: "Sponsorships", value: 50000, color: "#F7A6A6" },
      ],
    },
  };

  const cardData = data[type];

  const admissionData = [
    { name: "Boarding", value: cardData.boarding },
    { name: "Day", value: cardData.day },
  ];

  const COLORS = ["#D1B3F7", "#e8e8e8ff"];

  const getProgressBarColor = (percentage: number) => {
    if (percentage < 34) return "#F7A6A6"; // Red
    if (percentage < 67) return "#FAE27C"; // Yellow
    return "#A8E6A1"; // Green
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B`;
    }
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
    return num;
  };

  return (
    <div className="rounded-2xl shadow-sm bg-white p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
        <span className="text-[10px] bg-purple-100 p-2 rounded-full text-purple-600">
          {type === "Application" && <FileText size={24} className="text-purple-600" />}
          {type === "Admission" && <GraduationCap size={24} className="text-purple-600" />}
          {type === "Accommodation" && <Bed size={24} className="text-purple-600" />}
          {type === "Fund" && <Wallet size={24} className="text-purple-600" />}
        </span>
        {/* <Image src="/more.png" alt="" width={20} height={20} /> */}
      </div>
      {/* <h1 className="text-2xl font-semibold my-4">1234</h1> */}
      <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
          {type === "Fund" ? `GH₵ ${formatNumber(cardData.value)}` : cardData.value}
        </h1>
        <Image src="/more.png" alt="" width={24} height={24} />
      </div>
      {type === "Application" && (
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
      {type === "Admission" && (
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
      {type === "Accommodation" && (
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

          {/* <div className="mt-2 text-sm">
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                    <span>Boys: {cardData.boys.total}</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-pink-400 mr-2"></span>
                    <span>Girls: {cardData.girls.total}</span>
                </div>
            </div>
          </div> */}
        </div>
      )}
      {type === "Fund" && (
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