export default function Footer() {
    const gotoMyPortfolio = () => {
        window.open("https://maitisamy.github.io/portfolio/", "_blank");
    }
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()}, PLANNER.</p>
            <span>Made with ❤️ by 
                <a target="_blank" rel="noopener noreferrer" onClick={gotoMyPortfolio}> Aitisam Yaseen</a>
            </span>
        </footer>
    );
}