import type { Route } from "./+types";
import { Form } from "react-router";

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const errors: Record<string, string> = {}

    if (!name) errors.name = 'Name is reqiured';
    if (!email) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Invalid email format';
    }
    if (!subject) errors.subject = 'Subject is reqiured';
    if (!message) errors.message = 'Message is reqiured';

    if (Object.keys(errors).length > 0) {
        return { errors }
    }

    const data = {
        name,
        email,
        subject,
        message
    }

    return { message: 'Form Submitted Successfully', data };
}

const Contactpage = ({ actionData }: Route.ComponentProps) => {

    const errors = actionData?.errors || {};

    return (
        <div className="max-w-3xl mx-auto mt-12 px-6 py-6 bg-gray-900">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                contact me
            </h2>

            {actionData?.message ? (
                <p className="mb-6 p-4 bg-green-700 text-green-100 text-center rounded-lg border border-green-500 shadow-md">{actionData.message}</p>
            ) : null}

            <Form method="post" className="space-y-6">
                <div>
                    <label htmlFor="name" className="block-text-sm font-medium texto-gray-300">Name</label>
                    <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" id="name" name="name" />
                    {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="block-text-sm font-medium texto-gray-300">Email</label>
                    <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" id="email" name="email" />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="subject" className="block-text-sm font-medium texto-gray-300">Subejct</label>
                    <input type="text" className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" id="subject" name="subject" />
                    {errors.subject && (
                        <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="message" className="block-text-sm font-medium texto-gray-300">Message</label>
                    <textarea className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100" id="message" name="message" />
                    {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                    )}
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Send Message</button>
            </Form>
        </div>
    );
}

export default Contactpage;