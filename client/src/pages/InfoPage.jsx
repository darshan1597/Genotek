import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'

function InfoPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="h-[2px] w-full bg-[#6a9fba]" />
      <Navabar />

      <main className="w-full pr-6">
        <section className="mb-10 flex flex-col gap-2 pt-3 lg:flex-row lg:items-start">
          <Sidebar />

          <div className="flex-1">
            <div className="min-h-[420px] rounded-sm bg-[linear-gradient(180deg,#f7fbfd_0%,#eef5f8_100%)] px-10 py-14 shadow-[inset_0_0_0_1px_rgba(103,150,178,0.18)]">
              <div className="max-w-[980px]">
                <div className="mt-8 h-px w-full max-w-[820px] bg-[#a5becc]" />
                <p className="mt-8 text-[22px] leading-[1.7] text-[#42556c]">
                  Coming Soon.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default InfoPage
