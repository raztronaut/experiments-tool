module.exports = function (plop) {
    plop.setGenerator('experiment', {
        description: 'Create a new isolated experiment',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your experiment?',
                validate: (value) => {
                    if (/.+/.test(value)) {
                        return true;
                    }
                    return 'name is required';
                },
            },
            {
                type: 'input',
                name: 'description',
                message: 'Short description (optional):',
            },
        ],
        actions: function (data) {
            const actions = [
                // 1. Create Route Group Layout (Isolated Environment)
                {
                    type: 'add',
                    path: 'src/app/experiments/({{dashCase name}})/layout.tsx',
                    templateFile: 'plop-templates/experiment/route-layout.tsx.hbs',
                },
                // 2. Create Route Page
                {
                    type: 'add',
                    path: 'src/app/experiments/({{dashCase name}})/{{dashCase name}}/page.tsx',
                    templateFile: 'plop-templates/experiment/route-page.tsx.hbs',
                },
                // 3. Create Route Error Boundary
                {
                    type: 'add',
                    path: 'src/app/experiments/({{dashCase name}})/{{dashCase name}}/error.tsx',
                    templateFile: 'plop-templates/experiment/route-error.tsx.hbs',
                },
                // 4. Create Main Component
                {
                    type: 'add',
                    path: 'src/components/experiments/{{dashCase name}}/{{pascalCase name}}.tsx',
                    templateFile: 'plop-templates/experiment/component.tsx.hbs',
                },
                // 5. Create Component Story
                {
                    type: 'add',
                    path: 'src/components/experiments/{{dashCase name}}/{{pascalCase name}}.stories.tsx',
                    templateFile: 'plop-templates/experiment/component.stories.tsx.hbs',
                },
                // 6. Create Component Test
                {
                    type: 'add',
                    path: 'src/components/experiments/{{dashCase name}}/{{pascalCase name}}.test.tsx',
                    templateFile: 'plop-templates/experiment/component.test.tsx.hbs',
                },
                // 7. Register in Homepage
                {
                    type: 'modify',
                    path: 'src/app/(main)/page.tsx',
                    pattern: /(const experiments = \[\s*)/,
                    template: `$1  {
    title: "{{titleCase name}}",
    description: "{{description}}",
    href: "/experiments/{{dashCase name}}",
  },\n`,
                }
            ];

            return actions;
        },
    });
};
