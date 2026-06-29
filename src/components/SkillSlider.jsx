import {
  SiReact, SiThreedotjs, SiSwift, SiPython, SiGreensock, SiTailwindcss,
  SiFigma, SiTypescript, SiCisco, SiNextdotjs, SiVite,
  SiCss, SiHtml5, SiBlender, SiGit, SiNodedotjs, SiXcode, SiApple, SiFramer,
} from 'react-icons/si'

const ROW_A = [
  { label: 'React',        Icon: SiReact       },
  { label: 'Three.js',     Icon: SiThreedotjs  },
  { label: 'SwiftUI',      Icon: SiSwift       },
  { label: 'Python',       Icon: SiPython      },
  { label: 'GSAP',         Icon: SiGreensock   },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'Figma',        Icon: SiFigma       },
  { label: 'TypeScript',   Icon: SiTypescript  },
  { label: 'CISCO',        Icon: SiCisco       },
  { label: 'Next.js',      Icon: SiNextdotjs   },
  { label: 'Vite',         Icon: SiVite        },
]

const ROW_B = [
  { label: 'CSS3',              Icon: SiCss      },
  { label: 'HTML5',             Icon: SiHtml5    },
  { label: '3D Modelling',      Icon: SiBlender  },
  { label: 'Git',               Icon: SiGit      },
  { label: 'Motion Design',     Icon: SiFramer   },
  { label: 'Node.js',           Icon: SiNodedotjs },
  { label: 'Xcode',             Icon: SiXcode    },
  { label: 'CoreData',          Icon: SiApple    },
  { label: 'UX/UI Design',      Icon: SiFigma    },
  { label: 'iOS Development',   Icon: SiApple    },
]

function SliderRow({ items, reverse = false, duration = 60 }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-row overflow-hidden marquee-mask">
      <div
        className="marquee-track flex gap-4 cursor-default"
        style={{
          animation: `${reverse ? 'marquee-rev' : 'marquee'} ${duration}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map(({ label, Icon }, i) => (
          <span
            key={i}
            className="
              skill-badge
              inline-flex items-center gap-3 whitespace-nowrap
              px-6 py-3 rounded-xl
              text-[14px] font-medium tracking-tight
              border border-white/[0.08]
              bg-white/[0.03] backdrop-blur-sm
              text-zinc-300
              select-none
              shadow-[0_1px_8px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.4)]
            "
          >
            <Icon size={18} className="opacity-75 flex-shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SkillSlider() {
  return (
    <div className="border-y border-white/[0.05] bg-[#0a0a0a] py-7 overflow-hidden">
      <div className="flex flex-col gap-4">
        <SliderRow items={ROW_A} duration={65} />
        <SliderRow items={ROW_B} reverse duration={85} />
      </div>
    </div>
  )
}
