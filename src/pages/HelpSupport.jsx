function HelpSupport() {
  const faqItems = [
    {
      question: "How do I create a new fermentation record?",
      answer: "Navigate to Production > New Fermentation from the sidebar menu. Fill in the required fields including fermenter, mash bill, and start date, then submit the form."
    },
    {
      question: "How do I export TTB reports?",
      answer: "Go to Logs and Reports > TTB Reports. Select the report type and date range, then click the Export button to download the report in the required format."
    },
    {
      question: "Can I edit transactions after they've been submitted?",
      answer: "Most transactions can be edited through their respective log pages. However, some transactions may require administrator approval for modification. Contact your administrator if you need assistance."
    },
    {
      question: "How do I manage barrel inventory?",
      answer: "Use the Barrels section to track barrel fills, dumps, and inventory. You can view onsite and offsite barrels, check rackhouse inventory, and manage barrel history."
    },
    {
      question: "What should I do if I notice incorrect data?",
      answer: "If you notice incorrect data, you can use the adjustment logs in the relevant sections (Tanks, Barrels, etc.) to correct the information. For major corrections, contact your administrator."
    }
  ]

  const supportOptions = [
    {
      title: "Documentation",
      description: "Browse our comprehensive guides and tutorials",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
            Support
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent mb-4">
          Help & Support
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl">
          Find answers to common questions, access documentation, and get help when you need it.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 rounded-full blur-2xl group-hover:bg-accent-gold/10 transition-all duration-300"></div>
            <div className="relative">
              <div className="text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-200">
                {option.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{option.title}</h3>
              <p className="text-gray-400 text-sm">{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-gradient-to-br from-accent-gold/20 to-accent-gold/10 border border-accent-gold/30">
              <svg className="w-6 h-6 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-primary-dark/50 border border-accent-blue/30 hover:border-accent-gold/50 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-accent-gold mb-2">{item.question}</h3>
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is here to assist you. Reach out through one of the following channels:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@distillerytracker.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1-800-DISTILLERY</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Monday - Friday, 9:00 AM - 5:00 PM EST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpSupport



