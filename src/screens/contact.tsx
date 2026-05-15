import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-screen bg-surface-lowest pt-32 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate hover:text-white transition-colors mb-12 text-sm font-mono uppercase tracking-widest group">
          <i className='bx bx-left-arrow-alt text-base group-hover:-translate-x-1 transition-transform'></i> Voltar ao Início
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Fale Conosco</h1>
              <div className="h-px w-full bg-white/10" />
            </div>

            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] block">SEU NOME</label>
                  <input
                    type="text"
                    placeholder="Insira o nome completo"
                    className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-mono"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] block">SEU EMAIL</label>
                  <input
                    type="email"
                    placeholder="Insira o e-mail corporativo"
                    className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] block">INTERESSE DO PROJETO</label>
                <select className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer text-white/50 font-mono">
                  <option value="">Selecionar escopo</option>
                  <option value="software">Software Sob Medida</option>
                  <option value="infrastructure">Infraestrutura & Cloud</option>
                  <option value="modernization">Modernização de Legado</option>
                  <option value="mobile">Aplicativo Mobile</option>
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] block">EXPLIQUE SUA DEMANDA</label>
                <textarea
                  rows={6}
                  placeholder="Detalhe seus requisitos técnicos..."
                  className="w-full bg-white/[0.03] border-b-2 border-white/10 p-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/20 font-mono"
                />
              </div>

              <div className="flex justify-end pt-6">
                <button className="px-10 py-4 bg-primary hover:bg-primary-dim text-white rounded-md font-mono font-bold uppercase tracking-widest transition-all duration-300 glow-azure flex items-center gap-3">
                  ENVIAR <i className='bx bx-send text-xl'></i>
                </button>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-4 lg:pt-4">
            <div className="mb-12">
              <h2 className="text-3xl font-display font-bold mb-4 text-white/90">Comunicação Alternativa</h2>
              <div className="h-px w-full bg-white/10" />
            </div>

            <div className="flex items-start gap-6">
              <div className="mt-1 p-3 bg-primary/10 rounded-md text-primary">
                <i className='bx bx-envelope text-2xl'></i>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate uppercase tracking-[0.2em] block opacity-60">CANAL PRINCIPAL</span>
                <a href="mailto:contato@octasystem.com" className="text-xl font-mono text-primary font-medium hover:text-primary-dim transition-colors block">
                  contato@octasystem.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
