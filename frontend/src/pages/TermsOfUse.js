export function renderTermsOfUse(container) {
    const termsHTML = `
      <div class="bg-gray-50 dark:bg-gray-900 py-2">
        <div class="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h1 class="text-4xl font-bold text-center text-teal-700 dark:text-teal-300 mb-6">
            Terms of Use
          </h1>
  
          <!-- Acceptance of Terms -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              1. Acceptance of Terms
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using the services provided by WordWise, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our services. This agreement is made between you, the user, and WordWise, and is governed by the applicable laws.
            </p>
          </section>
  
          <!-- User Obligations -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              2. User Obligations and Responsibilities
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Users must:</p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Use the platform for lawful and constructive purposes only.</li>
              <li>Provide accurate information when creating an account.</li>
              <li>Respect the intellectual property rights of others.</li>
            </ul>
            <p class="text-gray-700 dark:text-gray-300 mb-4">Users are prohibited from:</p>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Posting or sharing content that is illegal, harmful, or offensive.</li>
              <li>Interfering with the functionality of the website.</li>
            </ul>
          </section>
  
          <!-- Intellectual Property Rights -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              3. Intellectual Property Rights and Ownership
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>All content, trademarks, and intellectual property related to WordWise are owned by the company or its licensors.</li>
              <li>Reproduction, distribution, or creation of derivative works from any content without prior written consent is prohibited.</li>
            </ul>
          </section>
  
          <!-- Limitation of Liability -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              4. Limitation of Liability
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>WordWise shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.</li>
              <li>This includes, but is not limited to, loss of profits, data, or goodwill.</li>
            </ul>
          </section>
  
          <!-- Indemnification -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              5. Indemnification
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>You agree to indemnify and hold harmless WordWise from any claims, damages, losses, liabilities, and expenses arising from your use of the services or violation of these Terms.</li>
            </ul>
          </section>
  
          <!-- Termination Clause -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              6. Termination Clause
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>WordWise reserves the right to terminate or suspend your account and access to services at any time without notice.</li>
              <li>This can occur for conduct that violates these Terms or is harmful to other users, the company, or third parties.</li>
            </ul>
          </section>
  
          <!-- Governing Law -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              7. Governing Law and Jurisdiction
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>These Terms shall be governed by and construed in accordance with the laws applicable in your jurisdiction.</li>
              <li>Any disputes arising from these terms will be resolved in the courts of your jurisdiction.</li>
            </ul>
          </section>
  
          <!-- Modification of Terms -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              8. Modification of Terms
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>WordWise reserves the right to modify these Terms at any time.</li>
              <li>Users will be notified of significant changes via the website or email.</li>
              <li>Continued use of the services after modifications constitutes acceptance of the new Terms.</li>
            </ul>
          </section>
  
          <!-- Legal Compliance -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              9. Legal Compliance and User Responsibility
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Users agree to comply with all applicable laws and regulations related to online content and copyright.</li>
            </ul>
          </section>
  
          <!-- Dispute Resolution -->
          <section class="mb-12">
            <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-teal-600 pb-2">
              10. Dispute Resolution
            </h2>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Any disputes arising out of or relating to these Terms of Use shall be resolved through amicable negotiations.</li>
              <li>If a resolution cannot be reached, the dispute will be referred to mediation as a first step.</li>
              <li>If mediation fails, the dispute shall be settled by binding arbitration in accordance with the Arbitration and Conciliation Act, applicable in your jurisdiction.</li>
              <li>The arbitration proceedings shall be conducted in the language specified by the arbitration body.</li>
              <li>Each party shall bear its own costs incurred during the arbitration process.</li>
            </ul>
          </section>
        </div>
      </div>
    `;

    // Insert the HTML into the specified container
    container.innerHTML = termsHTML;
}
