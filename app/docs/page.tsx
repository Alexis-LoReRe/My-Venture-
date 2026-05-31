export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
      <p className="text-gray-400 text-lg mb-12">Prompt library and build evidence for TalentBridge MX — Week 1 Generative Core Agent.</p>

      {/* Prompt 1 */}
      <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Prompt 1 — 10-Chapter Architecture</p>
        <p className="text-white font-semibold mb-2">Generate 10-Chapter Book Architecture</p>
        <p className="text-gray-400 text-sm leading-relaxed">"You are my disciplined AI-101 thinking partner. Help me create a 10-chapter book architecture around AI, emerging technology, and Mexican societal problems. Each chapter must include: title, problem, user, slice, technology, venture idea, who pays, impact, and risk. Ask me questions before recommending. I am the decision-maker."</p>
      </div>

      {/* Prompt 2 */}
      <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Prompt 2 — Venture Selection</p>
        <p className="text-white font-semibold mb-2">Select Strongest Chapter Idea</p>
        <p className="text-gray-400 text-sm leading-relaxed">"Compare all 10 chapter ideas. Which one has the largest addressable problem, the most specific slice, the clearest AI leverage, and the most realistic path to a 6-week prototype? Give me a ranked comparison with reasoning. I will make the final decision."</p>
      </div>

      {/* Prompt 3 */}
      <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Prompt 3 — Generative Core</p>
        <p className="text-white font-semibold mb-2">Extract Generative Core for TalentBridge MX</p>
        <p className="text-gray-400 text-sm leading-relaxed">"Take my selected venture TalentBridge MX and compress it into a Generative Core with 10 dimensions: problem, user, slice, technology, value, core principles, use cases, venture direction, business logic, impact, and risk."</p>
      </div>

      {/* Prompt 4 */}
      <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Prompt 4 — Build Prompt</p>
        <p className="text-white font-semibold mb-2">Claude Code Build Prompt</p>
        <p className="text-gray-400 text-sm leading-relaxed">"Build a /core page for my Next.js project. It must include: a 10-chapter book architecture table, a selected venture section, a Generative Core display with 10 dimensions, a user intake form, a Generate Core button, a Save button that stores to Supabase table Core_Outputs with columns id, created_at, idea, and Output."</p>
      </div>

      {/* Prompt 5 */}
      <div className="mb-10 rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">Prompt 5 — Debugging</p>
        <p className="text-white font-semibold mb-2">Debug Supabase Save Error</p>
        <p className="text-gray-400 text-sm leading-relaxed">"My save button shows Saved ✓ but nothing appears in Supabase. The console shows 400 errors on Core_Outputs. My table has columns: id, created_at, idea, Output. My code uses lowercase 'output'. Help me find and fix the mismatch."</p>
      </div>
    </div>
  );
}