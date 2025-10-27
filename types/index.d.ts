// declare module "*.module.css" {
//   const content: Record<string, string>;
//   export default content;
// }

declare module '*.css';

export type Event =  {
    slug: string,
    image: string,
    title: string,
    location: string,
    date: string,
    time: string,
}

export type Events = Event[]