<script lang="ts">
	import { A, Container, Div, H1, Img, P, Section } from '$lib/components';
</script>

<Section class="relative bg-black p-0 text-gray-50">
	<Img
		alt="Basketball Hoop in Basketball Court"
		class="absolute h-full w-full overflow-hidden object-cover opacity-30"
		src="https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg"
	/>
	<Container class="relative py-40">
		<Div class="flex flex-col space-y-6 text-center">
			<H1>Welcome to Jamil's League</H1>
			<P>Where Champions Are Made</P>
			<Div class="flex flex-col space-y-6">
				<A href="/sign-up">Join the League</A>
				<A href="/schedule">View Schedule</A>
			</Div>
		</Div>
	</Container>
</Section>
