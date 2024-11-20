import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/libs/supabaseClient';
import ProtectedRoute from '@/components/ProtectedRoute';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [dataCount, setDataCount] = useState(0);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        // Fetch counts and chart data from Supabase
    }, []);

    return (
        <ProtectedRoute>
            <div className="p-4">
                <div className="flex space-x-4">
                    <div>Total Users: {userCount}</div>
                    <div>Total Data: {dataCount}</div>
                </div>
                <div className="mt-8">
                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        height={350}
                    />
                </div>
            </div>
        </ProtectedRoute>
    );
}