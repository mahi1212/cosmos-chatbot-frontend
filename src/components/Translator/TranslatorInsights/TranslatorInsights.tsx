import { CiSquareInfo } from 'react-icons/ci';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TranslatorInsights = () => {

    const Probability = [
        { name: 'Group A', value: 34 },
        { name: 'Group B', value: 33 },
        { name: 'Group B', value: 33 },
    ];

    const data = [
        { name: 'Group A', value: 100 },
        { name: 'Group B', value: 0 },
    ];

    const COLORS = ['#399918', '#FF8225'];
    const RADIAN = Math.PI / 180;
    const NIDDLE_COLOR = ['#399918', '#FF8225', '#A02334'];
    const cx = 150; // Center x position of the pie chart
    const cy = 190; // Center y position of the pie chart
    const iR = 60;  // Inner radius of the pie chart (doughnut effect)
    const oR = 80;  // Outer radius of the pie chart
    const value = 0; // Value for the needle

    const needle = (value: number, data: any, cx: number, cy: number, iR: number, oR: number, color: any) => {
        let total = 0;
        data.forEach((v: any) => {
            total += v.value;
        });
        const ang = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 3;
        const sin = Math.sin(-RADIAN * ang);
        const cos = Math.cos(-RADIAN * ang);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return [
            <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
            <path key="needle" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
        ];
    };
    return (
        <div className='flex justify-center items-center flex-col'>
            <h1 className="dark:text-gray-200 text-black mt-5 font-semibold text-center text-lg">How robotic is your content? </h1>
            <ResponsiveContainer width="100%" height={400} className="-mt-20 ps-14 sm:ps-4">
                <PieChart>
                    <Pie
                        data={data}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}-${entry}`} fill={COLORS[index % 2]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className='-mt-20 flex items-start justify-center flex-col gap-2 dark:text-gray-200 text-black'>
                <p className='flex items-center justify-center gap-1'>
                    <CiSquareInfo className='size-5 ' />
                    80% content detected as AI driven!
                </p>
                <p className='flex items-center justify-center gap-1'>
                    <CiSquareInfo className='size-5 ' />
                    20% content looks human written
                </p>
            </div>


            <ResponsiveContainer width="100%" height={200} className="-mt-24 ps-6 sm:ps-0">
                <PieChart>
                    <Pie
                        data={Probability}
                        startAngle={180}
                        endAngle={0}
                        cx={cx}
                        cy={cy}
                        innerRadius={iR}
                        outerRadius={oR}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}-${entry}`} fill={NIDDLE_COLOR[index % 3]} />
                        ))}
                    </Pie>
                    {needle(value, data, cx, cy, iR, oR, '#d0d000')}
                </PieChart>
            </ResponsiveContainer>
            <h1 className="dark:text-gray-200 text-black mt-20 sm:mt-5 font-semibold text-center text-lg capitalize"> PLAGIARISM LEVEL: LOW </h1>

        </div>
    )
}

export default TranslatorInsights