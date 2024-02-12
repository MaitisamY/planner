import Image from 'next/image'
export default function Header() {
    return (
        <header>
            <a href="/">
                {/* <Image
                  src="/planner-icon.png"
                  alt="Planner Logo"
                  width={230}
                  height={55}
                  priority
                /> */}
                <Image
                  src="/planner-icon-black.png"
                  alt="Planner Logo"
                  width={230}
                  height={55}
                  priority
                />
                <h1>Planner</h1>
            </a>
        </header>
    );
}