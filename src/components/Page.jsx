// Reusable page component for placeholder pages
function Page({ title, category }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          {category && (
            <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
              {category}
            </span>
          )}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-4">
          {title}
        </h1>
      </div>

      {/* Content Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 md:p-12 shadow-2xl">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-2xl"></div>
        
        <div className="relative">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30 flex-shrink-0">
              <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">
                Coming Soon
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The <strong className="text-accent-gold font-semibold">{title}</strong> functionality is currently under development and will be available soon.
              </p>
              <p className="text-gray-400 leading-relaxed">
                This page will provide comprehensive tools and features to help you manage your distillery operations efficiently. Check back soon for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

