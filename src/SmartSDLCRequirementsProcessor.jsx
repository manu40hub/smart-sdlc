
import React, { useState, useRef } from 'react';
import { Upload, FileText, Brain, CheckCircle, AlertCircle, Download, Eye, RefreshCw } from 'lucide-react';

const SmartSDLCRequirementsProcessor = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedRequirements, setProcessedRequirements] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const fileInputRef = useRef(null);

  // Mock AI classification results
  const mockProcessedData = {
    extractedText: `The system shall provide user authentication functionality. Users must be able to register with email and password. The system should have a modern, responsive user interface. The application must integrate with payment gateways for transaction processing. All user data must be encrypted and stored securely. The system shall generate automated reports for administrators. Unit tests must be written for all core functionalities. The application should be deployed on cloud infrastructure with auto-scaling capabilities.`,
    
    classifications: [
      {
        phase: 'Requirements',
        sentences: [
          'The system shall provide user authentication functionality.',
          'Users must be able to register with email and password.',
          'All user data must be encrypted and stored securely.',
          'The system shall generate automated reports for administrators.'
        ],
        userStories: [
          {
            id: 'REQ-001',
            title: 'User Authentication System',
            story: 'As a user, I want to authenticate myself so that I can securely access the system.',
            acceptance: ['User can register with valid email and password', 'User can login with existing credentials', 'User receives appropriate error messages for invalid attempts'],
            priority: 'High'
          },
          {
            id: 'REQ-002',
            title: 'Data Security',
            story: 'As a system administrator, I want all user data to be encrypted so that sensitive information is protected.',
            acceptance: ['All passwords are hashed using secure algorithms', 'Sensitive data is encrypted at rest', 'Data transmission uses HTTPS'],
            priority: 'High'
          },
          {
            id: 'REQ-003',
            title: 'Administrative Reporting',
            story: 'As an administrator, I want to view automated reports so that I can monitor system performance and usage.',
            acceptance: ['Reports are generated automatically on schedule', 'Reports include key metrics and analytics', 'Reports can be exported in multiple formats'],
            priority: 'Medium'
          }
        ]
      },
      {
        phase: 'Design',
        sentences: [
          'The system should have a modern, responsive user interface.'
        ],
        userStories: [
          {
            id: 'DES-001',
            title: 'Responsive UI Design',
            story: 'As a user, I want a modern and responsive interface so that I can use the application on any device.',
            acceptance: ['Interface adapts to different screen sizes', 'Modern design patterns are implemented', 'UI follows accessibility guidelines'],
            priority: 'Medium'
          }
        ]
      },
      {
        phase: 'Development',
        sentences: [
          'The application must integrate with payment gateways for transaction processing.'
        ],
        userStories: [
          {
            id: 'DEV-001',
            title: 'Payment Gateway Integration',
            story: 'As a customer, I want to make secure payments so that I can complete transactions.',
            acceptance: ['Multiple payment methods are supported', 'Payment processing is secure and PCI compliant', 'Transaction status is tracked and reported'],
            priority: 'High'
          }
        ]
      },
      {
        phase: 'Testing',
        sentences: [
          'Unit tests must be written for all core functionalities.'
        ],
        userStories: [
          {
            id: 'TEST-001',
            title: 'Comprehensive Unit Testing',
            story: 'As a developer, I want comprehensive unit tests so that code quality and reliability are maintained.',
            acceptance: ['All core functions have unit tests', 'Test coverage is above 90%', 'Tests are automated in CI/CD pipeline'],
            priority: 'High'
          }
        ]
      },
      {
        phase: 'Deployment',
        sentences: [
          'The application should be deployed on cloud infrastructure with auto-scaling capabilities.'
        ],
        userStories: [
          {
            id: 'DEP-001',
            title: 'Cloud Deployment with Auto-scaling',
            story: 'As a system administrator, I want auto-scaling cloud deployment so that the application can handle varying loads efficiently.',
            acceptance: ['Application is containerized for cloud deployment', 'Auto-scaling policies are configured', 'Monitoring and alerting are in place'],
            priority: 'Medium'
          }
        ]
      }
    ],
    
    analytics: {
      totalSentences: 8,
      phaseDistribution: {
        'Requirements': 4,
        'Design': 1,
        'Development': 1,
        'Testing': 1,
        'Deployment': 1
      },
      confidenceScore: 0.92
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setActiveTab('processing');
    } else {
      alert('Please upload a PDF file');
    }
  };

  const processRequirements = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      setProcessedRequirements(mockProcessedData);
      setIsProcessing(false);
      setActiveTab('results');
    }, 3000);
  };

  const getPhaseColor = (phase) => {
    const colors = {
      'Requirements': 'bg-blue-100 text-blue-800 border-blue-200',
      'Design': 'bg-purple-100 text-purple-800 border-purple-200',
      'Development': 'bg-green-100 text-green-800 border-green-200',
      'Testing': 'bg-orange-100 text-orange-800 border-orange-200',
      'Deployment': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[phase] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-50 text-red-700 border-red-200',
      'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Low': 'bg-green-50 text-green-700 border-green-200'
    };
    return colors[priority] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            SmartSDLC Requirements Processor
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Transform unstructured PDF requirements into organized user stories using AI-powered classification and natural language processing.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-2 shadow-sm border">
            {['upload', 'processing', 'results'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                disabled={tab === 'processing' && !uploadedFile}
                className={`px-6 py-2 rounded-md mx-1 transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                } ${tab === 'processing' && !uploadedFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tab === 'upload' && '1. Upload'}
                {tab === 'processing' && '2. Process'}
                {tab === 'results' && '3. Results'}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8">
              <div className="text-center">
                <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Upload Requirements Document
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload a PDF containing your project requirements. Our AI will extract and classify the content automatically.
                </p>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <FileText className="mx-auto h-12 w-12 text-blue-400 mb-3" />
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {uploadedFile ? uploadedFile.name : 'Click to upload PDF'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF files up to 10MB
                  </p>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                {uploadedFile && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-700">File uploaded successfully!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Processing Tab */}
        {activeTab === 'processing' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8">

              <div className="text-center">
                <Brain className="mx-auto h-16 w-16 text-purple-500 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  AI Processing
                </h2>
                <p className="text-gray-600 mb-6">
                  Our AI is analyzing your document and classifying requirements into SDLC phases.
                </p>
                
                {!isProcessing && !processedRequirements && (
                  <button
                    onClick={processRequirements}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center mx-auto"
                  >
                    <Brain className="h-5 w-5 mr-2" />
                    Start AI Processing
                  </button>
                )}
                
                {isProcessing && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mr-3" />
                      <span className="text-lg font-medium text-gray-700">Processing...</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '70%'}}></div>
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      <p>✓ Extracting text from PDF</p>
                      <p>✓ Analyzing content with IBM Watsonx Granite-20B</p>
                      <p className="text-blue-600">⟳ Classifying requirements by SDLC phase</p>
                      <p className="text-gray-400">⧖ Generating user stories</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && processedRequirements && (
          <div className="space-y-6">
            {/* Analytics Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Total Sentences</p>
                  <p className="text-2xl font-bold text-blue-900">{processedRequirements.analytics.totalSentences}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">User Stories</p>
                  <p className="text-2xl font-bold text-green-900">
                    {processedRequirements.classifications.reduce((sum, phase) => sum + phase.userStories.length, 0)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">SDLC Phases</p>
                  <p className="text-2xl font-bold text-purple-900">{processedRequirements.classifications.length}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-orange-600 font-medium">AI Confidence</p>
                  <p className="text-2xl font-bold text-orange-900">
                    {Math.round(processedRequirements.analytics.confidenceScore * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Phase Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mt-8">

              <h3 className="text-xl font-semibold text-gray-900 mb-4">Phase Distribution</h3>
              <div className="flex flex-wrap gap-2">
                {Object.entries(processedRequirements.analytics.phaseDistribution).map(([phase, count]) => (
                  <span
                    key={phase}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${getPhaseColor(phase)}`}
                  >
                    {phase}: {count} items
                  </span>
                ))}
              </div>
            </div>

            {/* Classified Requirements by Phase */}
            <div className="space-y-6">
              {processedRequirements.classifications.map((phase, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100">
                  <div className={`p-4 rounded-t-xl border-b ${getPhaseColor(phase.phase)} bg-opacity-50`}>
                    <h3 className="text-xl font-semibold">{phase.phase} Phase</h3>
                    <p className="text-sm opacity-75">{phase.sentences.length} requirements identified</p>
                  </div>
                  
                  <div className="p-6">
                    {/* Original Sentences */}
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Extracted Requirements:</h4>
                      <div className="space-y-2">
                        {phase.sentences.map((sentence, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-gray-700">{sentence}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Generated User Stories */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Generated User Stories:</h4>
                      <div className="space-y-4">
                        {phase.userStories.map((story, idx) => (
                          <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="font-semibold text-gray-900">{story.id}: {story.title}</h5>
                                <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(story.priority)} mt-1`}>
                                  {story.priority} Priority
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-3 italic">{story.story}</p>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-900 mb-2">Acceptance Criteria:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {story.acceptance.map((criteria, criteriaIdx) => (
                                  <li key={criteriaIdx} className="text-sm text-gray-600">{criteria}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 pt-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Export User Stories
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                View Traceability Matrix
              </button>
              <button 
                onClick={() => {
                  setActiveTab('upload');
                  setUploadedFile(null);
                  setProcessedRequirements(null);
                  setIsProcessing(false);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              >
                Process New Document
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartSDLCRequirementsProcessor;