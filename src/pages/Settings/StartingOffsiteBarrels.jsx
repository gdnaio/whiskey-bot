import { useState, useRef } from 'react'

function StartingOffsiteBarrels() {
  const [selectedMonth, setSelectedMonth] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [parsedData, setParsedData] = useState([])
  const [uploadError, setUploadError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const dropZoneRef = useRef(null)

  // Expected CSV columns based on template
  const expectedColumns = [
    'BarrelNumber',
    'FillDate',
    'OriginalPG/LAA',
    'EntryPF/ABV',
    'InternalSpiritType',
    'CooperageSizeG/l',
    'OriginalDSPName',
    'NeworUsed',
    'Notes',
    'Location',
    'BarrelStock',
    'Value',
    'InternalLotName',
    'AnticipatedUse',
    'CurrentDSPName'
  ]

  const parseCSVLine = (line) => {
    const result = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          current += '"'
          i++
        } else {
          // Toggle quote state
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        result.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    
    // Add the last field
    result.push(current.trim())
    return result
  }

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n').filter(line => line.trim())
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row')
    }

    // Parse header
    const headers = parseCSVLine(lines[0]).map(h => h.trim())
    
    // Validate headers match expected format
    const missingColumns = expectedColumns.filter(col => !headers.includes(col))
    if (missingColumns.length > 0) {
      throw new Error(`Missing required columns: ${missingColumns.join(', ')}`)
    }

    // Parse data rows
    const data = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue // Skip empty lines

      // Handle CSV parsing with quoted fields support
      const values = parseCSVLine(line)
      
      if (values.length !== headers.length) {
        console.warn(`Row ${i + 1} has ${values.length} columns, expected ${headers.length}. Skipping.`)
        continue
      }

      const row = {}
      headers.forEach((header, index) => {
        row[header] = values[index] || ''
      })
      data.push(row)
    }

    return data
  }

  const handleFileSelect = async (file) => {
    if (!file) return

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      setUploadError('Please select a CSV file')
      return
    }

    setIsUploading(true)
    setUploadError('')
    setUploadedFile(file)

    try {
      const text = await file.text()
      const parsed = parseCSV(text)
      setParsedData(parsed)
      console.log('Parsed CSV data:', parsed)
      // TODO: Save to DynamoDB or handle data as needed
    } catch (error) {
      setUploadError(error.message || 'Failed to parse CSV file')
      setParsedData([])
      console.error('CSV parsing error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const templateContent = expectedColumns.join(',') + '\n' +
      '12345,10/12/2010,102.5,120,Bourbon,53,Example,New,Test,Warehouse,Example,450,Lot ABC,Product Master ABC,Example'
    
    const blob = new Blob([templateContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'OffsiteBarrelTemplate.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-1 w-12 bg-gradient-to-r from-accent-gold to-transparent"></div>
          <span className="text-accent-gold/80 text-sm font-semibold uppercase tracking-wider">
            Settings
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-gold to-white bg-clip-text text-transparent">
          Upload Offsite Barrel Data
        </h1>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-light via-primary-light to-primary-dark border border-accent-blue/50 shadow-2xl p-8">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl"></div>
        
        <div className="relative">
          <p className="text-gray-300 mb-6 leading-relaxed">
            Enter the starting month, always taken as the 1st of the month.
          </p>

          {/* Month Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Month
            </label>
            <div className="flex items-center gap-3">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-3 bg-primary-dark border border-accent-blue/50 rounded-xl text-gray-100 focus:outline-none focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/20 transition-all duration-200"
              />
              <button
                type="button"
                className="px-4 py-3 bg-gradient-to-br from-accent-blue to-accent-blue-light border border-accent-blue/50 rounded-xl text-gray-300 hover:text-accent-gold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Import Section */}
          <div className="mb-8">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Select a local file below to upload existing barrel inventory at the start of the month. The selected file must follow the template.
            </p>

            <div
              ref={dropZoneRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                isUploading
                  ? 'border-accent-gold bg-accent-gold/10'
                  : 'border-accent-blue/50 hover:border-accent-gold/50 bg-primary-dark/50'
              }`}
            >
              <div className="flex flex-col items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-6 py-3 bg-gradient-to-br from-accent-blue to-accent-blue-light text-gray-300 rounded-xl hover:text-accent-gold transition-all duration-200 font-medium shadow-md hover:shadow-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Processing...' : 'Select file to import...'}
                </button>
                <p className="text-gray-400 text-sm mb-2">Drop files here to upload</p>
                {uploadedFile && (
                  <p className="text-accent-gold text-sm mt-2">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>
            </div>

            {uploadError && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                <p className="text-red-300 text-sm">{uploadError}</p>
              </div>
            )}

            {parsedData.length > 0 && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                <p className="text-green-300 text-sm font-medium">
                  Successfully parsed {parsedData.length} barrel record(s)
                </p>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleDownloadTemplate}
                className="text-accent-gold hover:text-accent-gold-light underline font-medium transition-colors duration-200"
              >
                Download Offsite Barrel Upload Template
              </button>
            </div>
          </div>

          {/* Preview Parsed Data Table */}
          {parsedData.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h3 className="text-xl font-semibold text-accent-gold mb-4">Preview Uploaded Data</h3>
              <div className="rounded-xl border border-accent-blue/50 overflow-hidden">
                <table className="min-w-full divide-y divide-accent-blue/30">
                  <thead className="bg-gradient-to-r from-primary-dark to-primary-light">
                    <tr>
                      {expectedColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-primary-light/50 divide-y divide-accent-blue/20">
                    {parsedData.slice(0, 10).map((row, index) => (
                      <tr key={index} className="hover:bg-primary-dark/50 transition-colors duration-200">
                        {expectedColumns.map((col) => (
                          <td key={col} className="px-4 py-3 text-sm text-gray-300">
                            {row[col] || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {parsedData.length > 10 && (
                  <div className="p-4 bg-primary-dark/50 text-center text-gray-400 text-sm">
                    Showing first 10 of {parsedData.length} records
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Status Messages */}
        <div className="mt-8 pt-6 border-t border-accent-blue flex flex-wrap gap-6 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-gray-400">Locked due to incomplete prerequisites.</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-gray-400">Open for editing and not populated.</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-400">Open for editing but populated.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartingOffsiteBarrels
