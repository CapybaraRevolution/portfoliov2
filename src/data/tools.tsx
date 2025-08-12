// Define Tool interface with category and relatedServices
export interface Tool {
  title: string
  slug: string
  iconName: string // Changed from logo component to string
  category: 'Design' | 'Research' | 'PM' | 'Dev' | 'Experimentation' | 'Data' | 'AI'
  summary: string
  whatIUseItFor: string[]
  relatedServices: string[] // service IDs/anchors on /services
  chips: Array<{
    label: string
    href: string
  }>
  pattern: {
    y: string | number
    squares: Array<[x: number, y: number]>
  }
}

export const tools: Tool[] = [
  {
    title: 'Figma',
    slug: 'figma',
    iconName: 'DocumentIcon',
    category: 'Design',
    summary: 'End-to-end design and prototyping for collaborative product development.',
    whatIUseItFor: [
      'Wireframing and high-fidelity UI design',
      'Interactive prototypes for user testing',
      'Design system creation and maintenance',
      'Stakeholder collaboration and handoff specs',
      'Component library documentation'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Design Systems', href: '/process?panel=design-systems' },
      { label: 'Prototyping', href: '/process?panel=clickable-prototypes' },
      { label: 'UX Design', href: '/portfolio?tag=ux-design' },
      { label: 'UI Design', href: '/portfolio?tag=ui-design' }
    ],
    pattern: { y: 16, squares: [[0, 1], [1, 3]] as Array<[number, number]> }
  },
  {
    title: 'Jira',
    slug: 'jira',
    iconName: 'SquaresPlusIcon',
    category: 'PM',
    summary: 'Agile project management for sprint planning and backlog organization.',
    whatIUseItFor: [
      'Epic and user story creation with acceptance criteria',
      'Sprint planning and velocity tracking',
      'Cross-functional team coordination',
      'Bug tracking and resolution workflows',
      'Release planning and roadmap management'
    ],
    relatedServices: ['strategic-product-planning'],
    chips: [
      { label: 'Stakeholder Alignment', href: '/process?panel=stakeholder-alignment' },
      { label: 'Agile', href: '/portfolio?tag=agile' },
      { label: 'Project Management', href: '/portfolio?tag=project-management' }
    ],
    pattern: { y: -6, squares: [[-1, 2], [1, 3]] as Array<[number, number]> }
  },
  {
    title: 'Notion',
    slug: 'notion',
    iconName: 'BookIcon',
    category: 'PM',
    summary: 'Strategic documentation, research synthesis, and knowledge management.',
    whatIUseItFor: [
      'User research synthesis and persona documentation',
      'PRD templates and requirements documentation',
      'Meeting notes and decision logs',
      'Process documentation and team wikis',
      'Competitive analysis and market research'
    ],
    relatedServices: ['strategic-product-planning', 'requirements-analysis'],
    chips: [
      { label: 'Persona Mapping', href: '/process?panel=persona-journey-mapping' },
      { label: 'Research', href: '/portfolio?tag=user-research' },
      { label: 'Documentation', href: '/portfolio?tag=documentation' }
    ],
    pattern: { y: 32, squares: [[0, 2], [1, 4]] as Array<[number, number]> }
  },
  {
    title: 'Amplitude',
    slug: 'amplitude',
    iconName: 'ChartBarIcon',
    category: 'Data',
    summary: 'Product metrics and user behavior analysis for data-driven decisions.',
    whatIUseItFor: [
      'Funnel analysis and conversion optimization',
      'User cohort analysis and retention tracking',
      'Feature adoption and usage measurement',
      'A/B test result analysis and reporting',
      'Custom dashboard creation for stakeholders'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'Instrumentation', href: '/process?panel=instrumentation' },
      { label: 'Analytics', href: '/portfolio?tag=analytics' },
      { label: 'Conversion Optimization', href: '/portfolio?tag=conversion-optimization' }
    ],
    pattern: { y: 8, squares: [[1, 2], [2, 4]] as Array<[number, number]> }
  },
  {
    title: 'Hotjar',
    slug: 'hotjar',
    iconName: 'MagnifyingGlassIcon',
    category: 'Research',
    summary: 'User behavior insights through heatmaps, recordings, and feedback.',
    whatIUseItFor: [
      'Heatmap analysis to identify UI friction points',
      'User session recordings for usability insights',
      'Conversion funnel visualization and optimization',
      'User feedback collection and sentiment analysis',
      'Mobile vs desktop behavior comparison'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'User Research', href: '/portfolio?tag=user-research' },
      { label: 'Usability Testing', href: '/portfolio?tag=usability-testing' },
      { label: 'Mobile UX', href: '/portfolio?tag=mobile-ux' }
    ],
    pattern: { y: 24, squares: [[2, 1], [0, 3]] as Array<[number, number]> }
  },
  {
    title: 'GitHub',
    slug: 'github',
    iconName: 'LinkIcon',
    category: 'Dev',
    summary: 'Version control and developer collaboration for design-to-code handoff.',
    whatIUseItFor: [
      'Design system component documentation',
      'Issue tracking for UX bugs and improvements',
      'Developer handoff with detailed specs',
      'Design token management and versioning',
      'Pull request reviews for UI implementation'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Design Systems', href: '/process?panel=design-systems' },
      { label: 'Development Collaboration', href: '/portfolio?tag=dev-collaboration' },
      { label: 'Code Review', href: '/portfolio?tag=code-review' }
    ],
    pattern: { y: 12, squares: [[1, 0], [2, 2]] as Array<[number, number]> }
  },
  {
    title: 'Vercel',
    slug: 'vercel',
    iconName: 'BoltIcon',
    category: 'Dev',
    summary: 'Frontend deployment and performance monitoring for production apps.',
    whatIUseItFor: [
      'Staging environment setup for design reviews',
      'Core Web Vitals monitoring and optimization',
      'A/B testing infrastructure with feature flags',
      'Performance budget enforcement in CI/CD',
      'Preview deployments for stakeholder demos'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Performance', href: '/process?panel=performance-quality' },
      { label: 'Frontend Development', href: '/portfolio?tag=frontend' },
      { label: 'CI/CD', href: '/portfolio?tag=deployment' }
    ],
    pattern: { y: 20, squares: [[0, 0], [1, 2]] as Array<[number, number]> }
  },
  {
    title: 'Storybook',
    slug: 'storybook',
    iconName: 'PackageIcon',
    category: 'Dev',
    summary: 'Component library documentation and isolated component development.',
    whatIUseItFor: [
      'Design system component showcase and testing',
      'Interactive component documentation for developers',
      'Visual regression testing for UI consistency',
      'Component prop validation and edge case testing',
      'Cross-browser component compatibility checks'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Design Systems', href: '/process?panel=design-systems' },
      { label: 'Component Library', href: '/portfolio?tag=component-library' },
      { label: 'Quality Assurance', href: '/portfolio?tag=qa' }
    ],
    pattern: { y: 4, squares: [[2, 0], [0, 1]] as Array<[number, number]> }
  },
  {
    title: 'Optimizely',
    slug: 'optimizely',
    iconName: 'FlaskIcon',
    category: 'Experimentation',
    summary: 'A/B testing and feature flagging for data-driven product decisions.',
    whatIUseItFor: [
      'Multivariate testing for conversion optimization',
      'Feature flag management for gradual rollouts',
      'Audience segmentation for targeted experiments',
      'Statistical significance validation for test results',
      'Experiment hypothesis documentation and tracking'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'Experimentation', href: '/process?panel=experimentation' },
      { label: 'A/B Testing', href: '/portfolio?tag=ab-testing' },
      { label: 'Conversion Optimization', href: '/portfolio?tag=conversion-optimization' }
    ],
    pattern: { y: 28, squares: [[1, 1], [2, 3]] as Array<[number, number]> }
  },
  {
    title: 'Slack',
    slug: 'slack',
    iconName: 'ChatBubbleIcon',
    category: 'PM',
    summary: 'Team communication and workflow integration for async collaboration.',
    whatIUseItFor: [
      'Design review channels with automated notifications',
      'User research insight sharing and synthesis',
      'Sprint planning coordination across time zones',
      'Stakeholder alignment through dedicated channels',
      'Integration hub for design tools and analytics'
    ],
    relatedServices: ['strategic-product-planning'],
    chips: [
      { label: 'Team Collaboration', href: '/portfolio?tag=collaboration' },
      { label: 'Remote Work', href: '/portfolio?tag=remote' },
      { label: 'Async Communication', href: '/portfolio?tag=async' }
    ],
    pattern: { y: 36, squares: [[0, 3], [2, 1]] as Array<[number, number]> }
  },
  {
    title: 'UserInterviews',
    slug: 'user-interviews',
    iconName: 'CogIcon',
    category: 'Research',
    summary: 'User research recruitment and session management for qualitative insights.',
    whatIUseItFor: [
      'Participant recruitment with precise demographic targeting',
      'Moderated usability testing session coordination',
      'Interview scheduling and reminder automation',
      'Compensation management for research participants',
      'Research repository integration for insight synthesis'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'User Research', href: '/portfolio?tag=user-research' },
      { label: 'Personas', href: '/process?panel=persona-journey-mapping' },
      { label: 'Usability Testing', href: '/portfolio?tag=usability-testing' }
    ],
    pattern: { y: 40, squares: [[1, 4], [0, 2]] as Array<[number, number]> }
  },
  {
    title: 'Airtable',
    slug: 'airtable',
    iconName: 'FolderIcon',
    category: 'PM',
    summary: 'Data organization and project tracking with flexible database structures.',
    whatIUseItFor: [
      'User research participant database management',
      'Feature request tracking and prioritization',
      'Design system audit and component inventory',
      'Competitive analysis data organization',
      'Project timeline and milestone tracking'
    ],
    relatedServices: ['strategic-product-planning', 'requirements-analysis'],
    chips: [
      { label: 'Project Management', href: '/portfolio?tag=project-management' },
      { label: 'Data Organization', href: '/portfolio?tag=data-organization' },
      { label: 'Research Repository', href: '/portfolio?tag=research' }
    ],
    pattern: { y: 44, squares: [[2, 2], [1, 0]] as Array<[number, number]> }
  },
  {
    title: 'Framer',
    slug: 'framer',
    iconName: 'BoltIcon',
    category: 'Design',
    summary: 'Advanced interactive prototyping with code components and animations.',
    whatIUseItFor: [
      'High-fidelity interactive prototypes',
      'Micro-interaction design and animation',
      'Responsive prototype testing across devices',
      'Advanced user flow demonstrations',
      'Code-to-design component integration'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Interactive Prototypes', href: '/process?panel=clickable-prototypes' },
      { label: 'Animation Design', href: '/portfolio?tag=animation' },
      { label: 'Advanced Prototyping', href: '/portfolio?tag=prototyping' }
    ],
    pattern: { y: 48, squares: [[1, 3], [2, 0]] as Array<[number, number]> }
  },
  {
    title: 'VS Code',
    slug: 'vs-code',
    iconName: 'CogIcon',
    category: 'Dev',
    summary: 'Code editor for design system maintenance and light frontend development.',
    whatIUseItFor: [
      'Design token and CSS custom property management',
      'Component documentation and style guide updates',
      'HTML/CSS prototype creation for complex layouts',
      'Git workflow and version control for design assets',
      'Markdown documentation writing and maintenance'
    ],
    relatedServices: ['design-prototyping'],
    chips: [
      { label: 'Design Systems', href: '/process?panel=design-systems' },
      { label: 'Frontend Development', href: '/portfolio?tag=frontend' },
      { label: 'Documentation', href: '/portfolio?tag=documentation' }
    ],
    pattern: { y: 52, squares: [[0, 4], [2, 1]] as Array<[number, number]> }
  },
  {
    title: 'Miro',
    slug: 'miro',
    iconName: 'ShapesIcon',
    category: 'Research',
    summary: 'Collaborative whiteboarding for workshops and ideation sessions.',
    whatIUseItFor: [
      'User journey mapping and service blueprinting',
      'Collaborative workshop facilitation',
      'Affinity mapping for research synthesis',
      'Stakeholder alignment exercises and voting',
      'Information architecture diagramming'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'Journey Mapping', href: '/process?panel=persona-journey-mapping' },
      { label: 'Workshop Facilitation', href: '/portfolio?tag=facilitation' },
      { label: 'Research Synthesis', href: '/portfolio?tag=research-synthesis' }
    ],
    pattern: { y: 56, squares: [[1, 1], [0, 3]] as Array<[number, number]> }
  },
  {
    title: 'Mixpanel',
    slug: 'mixpanel',
    iconName: 'ChartBarIcon',
    category: 'Data',
    summary: 'Event-based analytics for detailed user behavior tracking and analysis.',
    whatIUseItFor: [
      'Custom event tracking setup and validation',
      'User flow analysis and drop-off identification',
      'Cohort analysis for feature adoption patterns',
      'Funnel analysis for conversion optimization',
      'Real-time dashboard creation for stakeholders'
    ],
    relatedServices: ['user-research-strategy'],
    chips: [
      { label: 'Analytics', href: '/portfolio?tag=analytics' },
      { label: 'User Behavior', href: '/portfolio?tag=user-behavior' },
      { label: 'Conversion Optimization', href: '/portfolio?tag=conversion-optimization' }
    ],
    pattern: { y: 60, squares: [[2, 3], [1, 2]] as Array<[number, number]> }
  }
]