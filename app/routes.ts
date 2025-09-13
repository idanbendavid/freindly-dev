import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    layout('./routes/Layouts/home.tsx', [index("./routes/home/index.tsx")]),
    layout('./routes/Layouts/main.tsx', [
        route('about', './routes/about/index.tsx'),
        route('contact', './routes/contact/index.tsx'),
        route('projects', './routes/project/index.tsx'),
        route('blog', './routes/blog/index.tsx'),
    ]),
] satisfies RouteConfig;
