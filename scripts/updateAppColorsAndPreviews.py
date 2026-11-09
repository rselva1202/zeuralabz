import re

with open('preview-site/src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add PreviewRouter import
if "import { PreviewRouter } from './previews/PreviewRouter';" not in code:
    code = code.replace(
        "import { LiveComponentPreview } from './components/LiveComponentPreview';",
        "import { LiveComponentPreview } from './components/LiveComponentPreview';\nimport { PreviewRouter } from './previews/PreviewRouter';"
    )

# 2. Update CATEGORY_COLORS
code = code.replace(
    "'backgrounds': { bg: '#FFDC58', text: '#000000', border: '#FFFFFF' },",
    "'backgrounds': { bg: '#E11D48', text: '#FFFFFF', border: '#FFFFFF' },"
)

# 3. Replace ComponentCard
new_component_card = """const ComponentCard = React.memo<ComponentCardProps>(({
  comp,
  isCopied,
  animationMode,
  onCopy,
  onOpenCode,
}) => {
  const catTheme = CATEGORY_COLORS[comp.category] || { bg: '#E11D48', text: '#FFFFFF', border: '#FFFFFF' };

  return (
    <div
      className="group rounded-lg bg-[#1A1A1A] border-[3px] border-white shadow-[6px_6px_0px_#E11D48] hover:shadow-[8px_8px_0px_#FF2B2B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150 flex flex-col overflow-hidden"
    >
      {/* Top Preview Area (Framed Box with 3px white bottom border & PreviewRouter) */}
      <div className="h-48 bg-black relative flex items-center justify-center overflow-hidden border-b-[3px] border-white">
        <PreviewRouter comp={comp} animationMode={animationMode} />
      </div>

      {/* Middle: Details */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#1A1A1A]">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-sm font-black text-white group-hover:text-[#E11D48] transition">
              {comp.name}
            </h3>
            <span className="text-[11px] text-[#E11D48] font-mono font-bold bg-[#111111] border border-white/40 px-1.5 py-0.5">
              {comp.slug}
            </span>
          </div>
          <p className="text-xs text-[#E5E5E5] font-medium mt-2 line-clamp-2 leading-relaxed">
            {comp.description}
          </p>

          {/* Best for tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span
              className="px-2 py-0.5 text-[10px] font-heading font-black uppercase border-[1.5px] border-white shadow-[1.5px_1.5px_0px_#E11D48]"
              style={{ backgroundColor: catTheme.bg, color: catTheme.text }}
            >
              {comp.category}
            </span>
            {comp.bestFor?.slice(0, 2).map((b) => (
              <span
                key={b}
                className="px-2 py-0.5 text-[10px] font-bold bg-[#111111] text-white border border-white/40"
              >
                ✓ {b}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="mt-4 pt-3 border-t-[2px] border-white/30 flex items-center justify-between gap-2">
          <button
            onClick={() =>
              onCopy(
                comp.source === 'react-bits'
                  ? `npx zeuralabz add ${comp.slug} --source react-bits`
                  : comp.source === 'magic-ui'
                  ? `npx zeuralabz add ${comp.slug} --source magic-ui`
                  : comp.source === 'aceternity'
                  ? `npx zeuralabz add ${comp.slug} --source aceternity`
                  : `npx zeuralabz add ${comp.slug} --source zeuralabz-original`
              )
            }
            className={`flex-1 py-2 px-3 text-xs font-mono font-black border-[2px] border-white shadow-[3px_3px_0px_#E11D48] transition active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-1.5 ${
              isCopied
                ? 'bg-[#A3E635] text-black font-black'
                : 'bg-black text-[#E11D48] hover:bg-zinc-900'
            }`}
          >
            {isCopied ? (
              '✔ COPIED TO CLIPBOARD!'
            ) : (
              <>
                <span>$</span> npx zeuralabz add {comp.slug}{' '}
                {comp.source === 'react-bits'
                  ? '--source react-bits'
                  : comp.source === 'magic-ui'
                  ? '--source magic-ui'
                  : comp.source === 'aceternity'
                  ? '--source aceternity'
                  : ''}
              </>
            )}
          </button>

          <button
            onClick={() => onOpenCode(comp)}
            className="neo-btn bg-[#E11D48] text-white border-[2px] border-white shadow-[3px_3px_0px_#FF90E8] px-3 py-2 text-xs font-heading font-black hover:bg-[#FF2B2B]"
            title="View code & usage"
          >
            CODE ➔
          </button>
        </div>
      </div>
    </div>
  );
});"""

# Replace ComponentCard definition
card_pattern = re.compile(r'const ComponentCard = React\.memo<ComponentCardProps>\(\(\{.*?\}\);\nComponentCard\.displayName = \'ComponentCard\';', re.DOTALL)
if card_pattern.search(code):
    code = card_pattern.sub(new_component_card + "\nComponentCard.displayName = 'ComponentCard';", code)
    print("Replaced ComponentCard successfully!")
else:
    print("Warning: ComponentCard pattern not found!")

# 4. Global replacements for #FFDC58 & related yellow references
replacements = [
    # Hero text & stickers
    ("selection:bg-[#FFDC58] selection:text-black", "selection:bg-[#E11D48] selection:text-white"),
    ("bg-[#FFDC58] text-black px-1 py-0.5 border-[2px] border-white ml-0.5", "bg-[#E11D48] text-white px-1 py-0.5 border-[2px] border-white ml-0.5"),
    ("bg-[#FFDC58] text-black px-2 py-0.5 border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] inline-block mt-1", "bg-[#E11D48] text-white px-2 py-0.5 border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] inline-block mt-1"),
    ("neo-btn bg-[#FFDC58] text-black px-3.5 py-1.5 text-xs flex items-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#FFDC58]", "neo-btn bg-[#E11D48] text-white px-3.5 py-1.5 text-xs flex items-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] hover:bg-[#FF2B2B]"),
    ("neo-btn bg-[#FFDC58] text-black font-heading text-sm px-6 py-3.5 flex items-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#FF90E8]", "neo-btn bg-[#E11D48] text-white font-heading text-sm px-6 py-3.5 flex items-center gap-2 border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] hover:bg-[#FF2B2B]"),
    ("bg-[#FFDC58] text-black border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] px-3 py-1 font-heading text-xs font-black uppercase rotate-[2deg]", "bg-[#E11D48] text-white border-[3px] border-white shadow-[4px_4px_0px_#FF90E8] px-3 py-1 font-heading text-xs font-black uppercase rotate-[2deg]"),
    ("bg-[#FFDC58] text-black border-b-[3px] border-white px-4 py-2 flex items-center justify-between font-heading text-xs font-black text-black", "bg-[#E11D48] text-white border-b-[3px] border-white px-4 py-2 flex items-center justify-between font-heading text-xs font-black"),
    ("bg-[#FFDC58] border-b-[3px] border-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-black", "bg-[#E11D48] border-b-[3px] border-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-white"),
    ("bg-[#FFDC58] text-black border-[2px] border-white px-2 py-0.5 hover:bg-yellow-400 font-heading font-black", "bg-[#E11D48] text-white border-[2px] border-white px-2 py-0.5 hover:bg-[#FF2B2B] font-heading font-black"),
    ("bg-[#FFDC58] border-b-[3px] border-white flex items-center justify-between", "bg-[#E11D48] border-b-[3px] border-white flex items-center justify-between text-white"),
    ("neo-btn bg-[#FFDC58] text-black border-[2px] border-white shadow-[3px_3px_0px_#FF90E8] px-3 py-1 text-xs", "neo-btn bg-[#E11D48] text-white border-[2px] border-white shadow-[3px_3px_0px_#FF90E8] px-3 py-1 text-xs hover:bg-[#FF2B2B]"),
    ("font-heading text-[#FFDC58] font-black mb-3 flex items-center gap-2 text-xs", "font-heading text-[#E11D48] font-black mb-3 flex items-center gap-2 text-xs"),
    ("text-[#FFDC58] font-bold>$ npx zeuralabz suggest", "text-[#E11D48] font-bold>$ npx zeuralabz suggest"),
    ("• Aurora Background [Yellow Accent]", "• Aurora Background [Red Accent]"),
    ("bg-[#FFDC58] text-black border-white shadow-[3px_3px_0px_#FF90E8] font-black", "bg-[#E11D48] text-white border-white shadow-[3px_3px_0px_#FF90E8] font-black"),
    ("hover:border-white hover:bg-[#FFDC58] hover:text-black hover:shadow-[3px_3px_0px_#FFDC58]", "hover:border-white hover:bg-[#E11D48] hover:text-white hover:shadow-[3px_3px_0px_#E11D48]"),
    ("w-10 h-10 bg-[#FFDC58] border-[3px] border-white shadow-[3px_3px_0px_#FFDC58] flex items-center justify-center text-lg font-black text-black", "w-10 h-10 bg-[#E11D48] border-[3px] border-white shadow-[3px_3px_0px_#E11D48] flex items-center justify-center text-lg font-black text-white"),
    ("bg-[#FFDC58] text-black shadow-[4px_4px_0px_#FF90E8] -translate-x-0.5 -translate-y-0.5", "bg-[#E11D48] text-white shadow-[4px_4px_0px_#FF90E8] -translate-x-0.5 -translate-y-0.5"),
    ("bg-[#FFDC58] text-black shadow-[3px_3px_0px_#FF90E8]", "bg-[#E11D48] text-white shadow-[3px_3px_0px_#FF90E8]"),
    ("bg-[#FFDC58] text-black shadow-[2px_2px_0px_#FF90E8]", "bg-[#E11D48] text-white shadow-[2px_2px_0px_#FF90E8]"),
    ("bg-[#FFDC58] text-black px-4 py-2 text-xs border-[2px] border-white shadow-[3px_3px_0px_#FF90E8]", "bg-[#E11D48] text-white px-4 py-2 text-xs border-[2px] border-white shadow-[3px_3px_0px_#FF90E8] hover:bg-[#FF2B2B]"),
    ("bg-[#FFDC58] text-black px-1 border border-black", "bg-[#E11D48] text-white px-1 border border-black"),
    ("bg-[#FFDC58] text-black px-4 py-2 text-xs font-heading font-black flex items-center gap-1.5 border-[2px] border-white shadow-[3px_3px_0px_#FF90E8]", "bg-[#E11D48] text-white px-4 py-2 text-xs font-heading font-black flex items-center gap-1.5 border-[2px] border-white shadow-[3px_3px_0px_#FF90E8] hover:bg-[#FF2B2B]"),
    ("w-12 h-12 bg-[#FFDC58] border-[3px] border-white shadow-[3px_3px_0px_#FF90E8] text-black", "w-12 h-12 bg-[#E11D48] border-[3px] border-white shadow-[3px_3px_0px_#FF90E8] text-white"),
    ("bg-[#FFDC58] text-black px-2 py-0.5 font-heading text-xs font-black uppercase border border-white", "bg-[#E11D48] text-white px-2 py-0.5 font-heading text-xs font-black uppercase border border-white"),
    ("p-5 bg-[#FFDC58] border-b-[3px] border-white flex items-center justify-between", "p-5 bg-[#E11D48] border-b-[3px] border-white flex items-center justify-between text-white"),
    ("h3 className=\"font-heading text-xl font-black text-black uppercase\">{selectedComponent.name}</h3>", "h3 className=\"font-heading text-xl font-black text-white uppercase\">{selectedComponent.name}</h3>"),
    ("p className=\"text-xs text-black font-mono font-bold mt-1\"", "p className=\"text-xs text-white/90 font-mono font-bold mt-1\""),
    ("px-3 py-1 bg-[#FFDC58] text-black hover:bg-yellow-400 font-heading font-black text-xs border border-white shadow-[2px_2px_0px_#FF90E8]", "px-3 py-1 bg-[#E11D48] text-white hover:bg-[#FF2B2B] font-heading font-black text-xs border border-white shadow-[2px_2px_0px_#FF90E8]"),
    ("px-2 py-0.5 bg-[#FFDC58] text-black hover:bg-yellow-400 font-heading font-black text-xs shrink-0 ml-2 border border-white", "px-2 py-0.5 bg-[#E11D48] text-white hover:bg-[#FF2B2B] font-heading font-black text-xs shrink-0 ml-2 border border-white"),
    ("neo-btn bg-[#FFDC58] text-black px-5 py-2 text-xs font-heading font-black hover:bg-yellow-400 border-[2px] border-white shadow-[3px_3px_0px_#FF90E8]", "neo-btn bg-[#E11D48] text-white px-5 py-2 text-xs font-heading font-black hover:bg-[#FF2B2B] border-[2px] border-white shadow-[3px_3px_0px_#FF90E8]"),
    ("hover:bg-[#FFDC58]", "hover:bg-[#E11D48] hover:text-white"),
    ("border-[#FFDC58]", "border-[#E11D48]"),
    ("text-[#FFDC58]", "text-[#E11D48]"),
    ("#FFDC58", "#E11D48"),
    ("#ffdc58", "#E11D48"),
    ("bg-yellow-400 border-[1.5px] border-black", "bg-rose-500 border-[1.5px] border-black"),
    ("bg-yellow-400 border border-white animate-pulse", "bg-rose-500 border border-white animate-pulse"),
    ("hover:bg-yellow-400", "hover:bg-[#FF2B2B]"),
    ("5px yellow top border", "5px crimson red top border"),
]

for orig, repl in replacements:
    code = code.replace(orig, repl)

with open('preview-site/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Finished updating App.tsx!")

