import { motion } from 'framer-motion';
import { Zap, Gauge, Battery, Wind, TrendingUp, Award } from 'lucide-react';
import { useConfiguratorStore } from '../store/configuratorStore';

export default function PerformanceDashboard() {
  const { performanceStats } = useConfiguratorStore();

  const stats = [
    {
      icon: Gauge,
      label: 'Horsepower',
      value: performanceStats.horsepower,
      unit: 'HP',
      color: '#dc3545'
    },
    {
      icon: TrendingUp,
      label: 'Torque',
      value: performanceStats.torque,
      unit: 'lb-ft',
      color: '#fd7e14'
    },
    {
      icon: Zap,
      label: '0-60 MPH',
      value: performanceStats.acceleration,
      unit: 's',
      color: '#ffc107'
    },
    {
      icon: Wind,
      label: 'Top Speed',
      value: performanceStats.topSpeed,
      unit: 'MPH',
      color: '#0d6efd'
    },
    {
      icon: Battery,
      label: 'Range',
      value: performanceStats.range,
      unit: 'mi',
      color: '#198754'
    },
    {
      icon: Award,
      label: 'Efficiency',
      value: performanceStats.efficiency,
      unit: '%',
      color: '#20c997'
    }
  ];

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="absolute right-8 top-8 z-20 w-96"
    >
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Gauge className="w-6 h-6 text-white/80" />
          <h3 className="text-xl font-light text-white">Performance Stats</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const percentage = (stat.value / (stat.label === 'Horsepower' ? 1000 : stat.label === 'Top Speed' ? 200 : 100)) * 100;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${stat.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                    className="text-2xl font-light text-white"
                  >
                    {stat.value}
                    <span className="text-sm text-white/60 ml-1">{stat.unit}</span>
                  </motion.span>
                </div>

                <p className="text-white/70 text-sm font-light mb-2">{stat.label}</p>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${stat.color}aa, ${stat.color})`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Real-time Performance Graph */}
        <div className="mt-6 backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-sm font-light">Power Curve</span>
            <span className="text-white/60 text-xs">Real-time</span>
          </div>
          
          <div className="relative h-24 flex items-end justify-between gap-1">
            {Array.from({ length: 20 }).map((_, i) => {
              const height = Math.sin(i * 0.3) * 40 + 50;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="flex-1 rounded-t"
                  style={{
                    background: `linear-gradient(to top, #0d6efd, #20c997)`,
                    opacity: 0.7
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
