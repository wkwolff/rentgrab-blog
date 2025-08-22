  # RentGrab Blog Style Guide

  Version 1.0 | Last Updated: August 2025

  This style guide ensures visual and brand consistency between the RentGrab blog and the main platform, creating a cohesive user experience across all touchpoints.

  ---

  ## 🎨 Brand Identity

  ### Logo
  - **Primary Logo**: `rentgrab_logo.svg`
  - **Minimum Size**: 32px height
  - **Clear Space**: Maintain clear space equal to the height of the "R" around the logo
  - **Usage**: Always link logo to main RentGrab platform (rentgrab.com)

  ### Brand Voice
  - **Friendly & Approachable**: Use conversational tone while maintaining professionalism
  - **Helpful & Informative**: Focus on providing value to renters and owners
  - **Trustworthy**: Back claims with data, user stories, and expert insights
  - **Inclusive**: Write for diverse audiences with varying rental experience

  ### Content Pillars
  1. **Rental Tips & Guides**: How-to content for renters and owners
  2. **Industry Insights**: Market trends and analysis
  3. **Success Stories**: User testimonials and case studies
  4. **Product Updates**: New features and improvements
  5. **Community Spotlight**: Featured items and power users

  ---

  ## 🎨 Color Palette

  ### Primary Colors
  ```css
  --primary-50:  #fff1f1;  /* Lightest tint for backgrounds */
  --primary-100: #ffe1e1;  /* Light backgrounds */
  --primary-200: #ffc7c7;  /* Hover states for light elements */
  --primary-300: #ffa0a0;  /* Disabled states */
  --primary-400: #ff6b6b;  /* Secondary emphasis */
  --primary-500: #ff385c;  /* Main brand color - CTAs, links */
  --primary-600: #ed1c3d;  /* Hover state for primary */
  --primary-700: #c8132e;  /* Active/pressed state */
  --primary-800: #a51529;  /* Dark mode primary */
  --primary-900: #881827;  /* Darkest shade */

  Neutral Colors

  --neutral-50:  #fafafa;  /* Off-white backgrounds */
  --neutral-100: #f5f5f5;  /* Light gray backgrounds */
  --neutral-200: #e5e5e5;  /* Borders, dividers */
  --neutral-300: #d4d4d4;  /* Disabled text */
  --neutral-400: #a3a3a3;  /* Placeholder text */
  --neutral-500: #737373;  /* Secondary text */
  --neutral-600: #525252;  /* Body text light */
  --neutral-700: #404040;  /* Body text medium */
  --neutral-800: #262626;  /* Body text dark */
  --neutral-900: #171717;  /* Headings, emphasis */

  Semantic Colors

  --success:     #16a34a;  /* Success messages, confirmations */
  --warning:     #f59e0b;  /* Warnings, cautions */
  --error:       #ef4444;  /* Errors, destructive actions */
  --info:        #3b82f6;  /* Information, tips */

  Usage Guidelines

  - Primary Action: Use primary-500 (#ff385c)
  - Secondary Action: Use neutral-800 (#262626)
  - Body Text: Use neutral-800 (#262626) on light backgrounds
  - Secondary Text: Use neutral-500 (#737373) for metadata, captions
  - Backgrounds: Alternate between white and neutral-50 for sections
  - Borders: Use neutral-200 (#e5e5e5) for subtle divisions

  ---
  📝 Typography

  Font Family

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  Type Scale

  Headings

  /* Hero/Page Title */
  .text-hero {
    font-size: 3.5rem;    /* 56px */
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* Article Title */
  .text-h1 {
    font-size: 2.5rem;    /* 40px */
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  /* Section Title */
  .text-h2 {
    font-size: 2rem;      /* 32px */
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  /* Subsection */
  .text-h3 {
    font-size: 1.5rem;    /* 24px */
    line-height: 1.4;
    font-weight: 600;
  }

  /* Small Heading */
  .text-h4 {
    font-size: 1.25rem;   /* 20px */
    line-height: 1.5;
    font-weight: 600;
  }

  Body Text

  /* Article Body */
  .text-body {
    font-size: 1.125rem;  /* 18px */
    line-height: 1.75;
    font-weight: 400;
  }

  /* Regular Text */
  .text-base {
    font-size: 1rem;      /* 16px */
    line-height: 1.5;
    font-weight: 400;
  }

  /* Small Text */
  .text-small {
    font-size: 0.875rem;  /* 14px */
    line-height: 1.5;
    font-weight: 400;
  }

  /* Caption/Meta */
  .text-caption {
    font-size: 0.75rem;   /* 12px */
    line-height: 1.5;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  Blog-Specific Typography

  Article Styling

  - Paragraph Spacing: 1.5rem between paragraphs
  - First Paragraph: Larger font size (1.25rem) for article introduction
  - Drop Caps: Optional for feature articles, 3 lines tall
  - Pull Quotes: 1.5x body size, primary-500 color accent

  Lists

  - Unordered Lists: Custom bullet using primary color
  - Ordered Lists: Numbers in primary-600, bold weight
  - List Spacing: 0.5rem between items

  ---
  🧩 Component Styles

  Buttons

  Primary Button

  .btn-primary {
    background: #ff385c;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s;
  }
  .btn-primary:hover {
    background: #ed1c3d;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 56, 92, 0.3);
  }

  Secondary Button

  .btn-secondary {
    background: white;
    color: #262626;
    border: 1px solid #e5e5e5;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
  }
  .btn-secondary:hover {
    background: #fafafa;
    border-color: #d4d4d4;
  }

  Cards

  Article Card

  .article-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    transition: all 0.3s;
  }
  .article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  Featured Image

  - Aspect Ratio: 16:9 for article headers, 3:2 for cards
  - Border Radius: 8px for inline images
  - Hover Effect: Slight zoom (scale: 1.05) on card hover

  Blog Components

  Author Bio Box

  .author-bio {
    background: #fafafa;
    border-left: 4px solid #ff385c;
    padding: 24px;
    border-radius: 8px;
    display: flex;
    gap: 20px;
  }
  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid white;
  }

  Category Tags

  .tag {
    background: #fff1f1;
    color: #c8132e;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .tag:hover {
    background: #ffe1e1;
  }

  Blockquotes

  .blockquote {
    border-left: 4px solid #ff385c;
    padding-left: 24px;
    margin: 32px 0;
    font-size: 1.25rem;
    font-style: italic;
    color: #525252;
  }

  Code Blocks

  .code-block {
    background: #171717;
    color: #f5f5f5;
    padding: 20px;
    border-radius: 8px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.875rem;
    overflow-x: auto;
  }
  .code-inline {
    background: #f5f5f5;
    color: #c8132e;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.875em;
  }

  ---
  📐 Spacing & Layout

  Spacing Scale

  --space-xs:  4px;    /* Tight spacing */
  --space-sm:  8px;    /* Small elements */
  --space-md:  16px;   /* Default spacing */
  --space-lg:  24px;   /* Section spacing */
  --space-xl:  32px;   /* Large gaps */
  --space-2xl: 48px;   /* Major sections */
  --space-3xl: 64px;   /* Page sections */

  Container Widths

  --container-xs:  640px;   /* Centered content */
  --container-sm:  768px;   /* Article text */
  --container-md:  1024px;  /* Standard layout */
  --container-lg:  1280px;  /* Wide layout */
  --container-xl:  1536px;  /* Full width */

  Grid System

  - Desktop: 12-column grid with 24px gutters
  - Tablet: 8-column grid with 20px gutters
  - Mobile: 4-column grid with 16px gutters

  Blog Layout

  /* Article Container */
  .article-container {
    max-width: 768px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Sidebar Layout */
  .blog-layout {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 48px;
    max-width: 1280px;
  }

  ---
  ✨ Visual Effects

  Shadows

  --shadow-xs:     0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:     0 2px 4px rgba(0,0,0,0.08);
  --shadow-md:     0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg:     0 8px 24px rgba(0,0,0,0.12);
  --shadow-xl:     0 16px 48px rgba(0,0,0,0.16);
  --shadow-hover:  0 8px 24px rgba(255,56,92,0.2);

  Border Radius

  --radius-sm:  4px;    /* Small elements */
  --radius-md:  8px;    /* Buttons, inputs */
  --radius-lg:  12px;   /* Cards */
  --radius-xl:  16px;   /* Modals */
  --radius-2xl: 24px;   /* Large cards */
  --radius-full: 9999px; /* Pills, avatars */

  Animations

  /* Fade In */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Slide Up */
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Standard Transition */
  .transition-standard {
    transition: all 0.2s ease-in-out;
  }

  ---
  📱 Responsive Design

  Breakpoints

  --mobile:    640px;   /* < 640px */
  --tablet:    768px;   /* >= 640px */
  --desktop:   1024px;  /* >= 1024px */
  --wide:      1280px;  /* >= 1280px */

  Mobile Considerations

  - Touch Targets: Minimum 44x44px
  - Font Sizes: Scale down 10-15% on mobile
  - Spacing: Reduce by 25% on mobile
  - Images: Full width on mobile, contained on desktop
  - Navigation: Hamburger menu below 768px

  ---
  ♿ Accessibility

  Color Contrast

  - Normal Text: Minimum 4.5:1 ratio
  - Large Text: Minimum 3:1 ratio (24px+ or 18px+ bold)
  - Interactive Elements: Minimum 3:1 against background

  Focus States

  :focus-visible {
    outline: 2px solid #ff385c;
    outline-offset: 2px;
    border-radius: 4px;
  }

  Screen Reader Considerations

  - Use semantic HTML (article, nav, main, aside)
  - Provide alt text for all images
  - Include skip links for navigation
  - Use ARIA labels for interactive elements
  - Ensure keyboard navigation works throughout

  ---
  📝 Blog-Specific Guidelines

  Article Structure

  1. Hero Image: Full-width, 16:9 aspect ratio
  2. Title: H1, maximum 80 characters
  3. Meta Info: Author, date, reading time, category
  4. Introduction: Larger text, summarizes article
  5. Body: Clear sections with H2/H3 headings
  6. Images: Centered with captions
  7. Call-to-Action: End with related content or newsletter signup
  8. Author Bio: Bottom of article
  9. Related Articles: 3-column grid below article

  SEO Considerations

  - Use descriptive, keyword-rich titles
  - Include meta descriptions (150-160 characters)
  - Optimize images with descriptive filenames
  - Use structured data for articles
  - Include social sharing metadata

  Performance Guidelines

  - Lazy load images below the fold
  - Use WebP format with fallbacks
  - Optimize font loading (font-display: swap)
  - Minimize CSS/JS for blog pages
  - Target <3 second load time

  ---
  🎯 Implementation Checklist

  Essential Elements

  - Import Inter font from Google Fonts
  - Set up color variables in CSS
  - Create reusable button components
  - Design article card component
  - Implement responsive grid system
  - Add syntax highlighting for code blocks
  - Create author bio component
  - Design category/tag system
  - Implement social sharing buttons
  - Add newsletter signup form

  Nice-to-Have Features

  - Dark mode support
  - Reading progress indicator
  - Estimated reading time
  - Table of contents for long articles
  - Comments system integration
  - Search functionality
  - RSS feed
  - Print styles

  ---
  📚 Resources

  Design Assets

  - Logo files: Available in SVG format
  - Icon set: Lucide React icons (matching main platform)
  - Image placeholders: Maintain 16:9 or 3:2 aspect ratios

  Development Tools

  - Tailwind CSS classes align with this guide
  - Use cn() utility for conditional classes
  - Maintain mobile-first approach
  - Test across browsers and devices